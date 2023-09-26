import React from 'react';
import '../../../../assets/styles/about.css'

const ProjectButton = ({ imgUrl, title, state, description, tags }) => {
  return (
    <div className="btn__style">
      <div className="btn__wrapper">
        <div className="section--left">
          <div className="container__img">
            <img src={imgUrl} alt={title} />
          </div>
        </div>
        <div className="section--right">
          <div className="wrapper__content">
            <div className="content__title">
              {title} <i className="icon fas fa-external-link-alt"></i>
            </div>
            <div className="content__state">{state}</div>
            <div className="content__desc">{description}</div>
            <div className="content--tags">
              {tags.map((tag, index) => (
                <div className="tag" key={index}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectButton;
