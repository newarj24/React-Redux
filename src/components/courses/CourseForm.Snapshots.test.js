import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";

it('sets submit button label "Saving.." when saving is true', () => {
  // Renderer returns a tree which is an object that represents the output of react component
  // jest.fn() - Creates an empty mock function, so we dont have to declare our own for the test
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onChange={jest.fn()}
      onSave={jest.fn()}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});
