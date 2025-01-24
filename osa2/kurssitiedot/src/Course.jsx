import React from "react";

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h3>{course.name}</h3>;
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ course }) => {
  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>
      <strong>Number of exercises {total}</strong>
    </p>
  );
};

export default Course;
