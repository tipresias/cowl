import React from "react";
import { mount } from "enzyme";
import ErrorBoundary from "../index";

function ProblemChild() {
  throw new Error("oops");
  return <div>Error</div>; // eslint-disable-line
}

const originalError = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = originalError;
});

describe("ErrorBoundary", () => {
  it("renders a ErrorBoundary", () => {
    const wrapper = mount(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(wrapper.find("h2").text()).toBe("Something went wrong.");
  });
});
