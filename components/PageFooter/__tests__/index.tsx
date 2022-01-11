import React from "react";
import { mount } from "enzyme";
import renderWithTheme from "../../../test-support/renderWithTheme";
import PageFooter from "../index";

const TEST_THEME = {
  colors: {
    textColor: "black",
    logoFilter: "inherit",
  },
};

describe("PageFooter", () => {
  it("renders PageFooter", () => {
    const wrapper = renderWithTheme(<PageFooter />, TEST_THEME, mount);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
