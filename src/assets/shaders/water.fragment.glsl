#define TAU 6.28318530718
#define TILING_FACTOR 1.0
#define MAX_ITER 5


float waterHightLight(vec2 p, float time, float foaminess){
    vec2 i = vec2(p);
    float c = 0.0;
    float foaminess_factor = mix(1.0, 7.0, foaminess);
    float inten = .005;
    for (int n = 0; n < MAX_ITER; n++){
        float t = time * (1.0 - (3.5 / float(n+1)));
        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
        c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten), p.y / (cos(i.y+t)/inten)));
    }
    c = 0.2 + c / float(MAX_ITER);
    c = 1.17-pow(c, 1.4);
    c = pow(abs(c), 8.0);
    return c / sqrt(foaminess_factor);
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float time = iTime * 0.5 + 23.0;
    vec2 uv = fragCoord/iResolution.xy;
    vec2 uv_square = vec2(uv.x * iResolution.x / iResolution.y, uv.y);
    float center = pow(2.0 * length(uv - 0.5), 2.0);

    float foaminess = smoothstep(0.5, 1.5, center);
    float clearness = 0.1 + 0.9 * smoothstep(0.1, 0.5, center);

    vec2 p = mod(uv_square * TAU * TILING_FACTOR, TAU) - 250.0;
    float c = waterHightLight(p, time, foaminess);

    vec3 waterColor = vec3(0.0627, 0.6039, 0.8314);
    vec3 color = vec3(c);
    color = clamp(color + waterColor, 0.0, 1.0);

    color = mix(waterColor, color, clearness);

    fragColor = vec4(color, 1.0);
}