import React from "react";
import * as Gatsby from "gatsby";
import { fireEvent, render } from "@testing-library/react";
// Type
import { CourseType } from "@type/Course";
// Testing-Component
import { Course } from ".";
// Mock
import { CourseQueryResult, CourseQueryResult_ForMoreButton } from "./Course.test.mock";
// Assets
import { SUBTITLE, TITLE } from "assets/static/phrases";
// Lib
import { strainMdxInfo } from "lib/utils";
import { TestProvider } from "lib/testUtils";

describe("<Course>", () => {
  const renderCourse = () =>
    render(
      <TestProvider>
        <Course />
      </TestProvider>
    );
  const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
  useStaticQuery.mockImplementation(() => CourseQueryResult);
  const { courses }: { courses: CourseType[] } = strainMdxInfo(CourseQueryResult);
  it("컴포넌트의 제목과 부제목이 보여진다.", () => {
    const { getByText } = renderCourse();

    getByText(TITLE.COURSE);
    getByText(SUBTITLE.CODE_TOGETHER_COURSE);
  });
  it("코드투게더의 교육과정들이 보여진다.", async () => {
    const { getAllByText, getByText } = renderCourse();

    courses.forEach(({ master, title, dueDate, price, tags }) => {
      getAllByText(master);
      getByText(title);
      getByText(dueDate);
      getAllByText(price);
      tags.forEach((tag) => {
        getAllByText(tag);
      });
    });
  });
  it("교육 과정의 갯수가 9개 이하이면 더보기 버튼은 보여지지 않는다.", async () => {
    const { queryByText } = renderCourse();

    expect(courses.length <= 9).toBeTruthy();

    const moreBtn = queryByText("더보기");
    expect(moreBtn).toBeNull();
  });
  it("교육 과정의 갯수가 10개 이상이면 더보기 버튼이 보여진다.", async () => {
    useStaticQuery.mockImplementation(() => CourseQueryResult_ForMoreButton);
    const { courses }: { courses: CourseType[] } = strainMdxInfo(CourseQueryResult_ForMoreButton);
    const { getByText } = renderCourse();

    expect(courses.length >= 10).toBeTruthy();
    getByText("더보기");
  });
  it("화면에 보여지는것 의외에 더 보여줄 수 있는 교육 과정이 9개 이상 있다면 더보기 버튼 클릭시 9개가 추가되어 보여진다.", async () => {
    const { getByText, getAllByLabelText } = renderCourse();

    let courseCards = getAllByLabelText("course-card");
    expect(courseCards.length).toEqual(9);

    const moreBtn = getByText("더보기");
    fireEvent.click(moreBtn);
    courseCards = getAllByLabelText("course-card");
    expect(courseCards.length).toEqual(18);
  });
  it("화면에 보여지는것 의외에 더 보여줄 수 있는 교육 과정이 9개 미만이라면 남은 교육 과정이 추가되어 보여진다.", async () => {
    const { getByText, getAllByLabelText } = renderCourse();

    let courseCards = getAllByLabelText("course-card");
    const moreBtn = getByText("더보기");

    fireEvent.click(moreBtn);
    courseCards = getAllByLabelText("course-card");
    expect(courseCards.length).toEqual(18);

    fireEvent.click(moreBtn);
    courseCards = getAllByLabelText("course-card");
    expect(courseCards.length).toEqual(20);
  });
});
