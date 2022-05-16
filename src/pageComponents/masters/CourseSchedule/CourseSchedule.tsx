import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
// Typography
import { LBody, SDisplay } from "typography";
// Components
import { ScheduleNav } from "./ScheduleNav";
import { ScheduleInfo } from "./ScheduleInfo";
// Assets
import { SUBTITLE, TITLE } from "assets/static/phrases";
// Utils
import { strainMdxInfo } from "lib/utils";

const CourseSchedule: React.FC = ({}) => {
  const scheduleInfo = strainMdxInfo(useStaticQuery(ScheduleQuery));
  const { progress } = scheduleInfo;

  const [selectedScheduleIndex, setSelectedScheduleIndex] = React.useState(0);

  return (
    <CourseScheduleWrapper>
      <ScheduleTitleWrapper>
        <LBody bold>{SUBTITLE.MASTERS_COURSE_SCHEDULE}</LBody>
        <ScheduleHeadTitle>
          <SDisplay>{TITLE.MASTERS_COURSE_SCHEDULE}</SDisplay>
        </ScheduleHeadTitle>
      </ScheduleTitleWrapper>
      <ScheduleWrapper>
        <ScheduleLeftRuler>
          <ScheduleNav {...{ progress, selectedScheduleIndex, setSelectedScheduleIndex }} />
          <ScheduleInfo {...{ scheduleInfo, selectedScheduleIndex }} />
        </ScheduleLeftRuler>
      </ScheduleWrapper>
    </CourseScheduleWrapper>
  );
};

const CourseScheduleWrapper = styled.div`
  margin-top: 16rem;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 144rem;
  flex-direction: column;
`;
const ScheduleTitleWrapper = styled.div`
  width: 107rem;
  display: flex;
  flex-direction: column;
`;

const ScheduleHeadTitle = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 5.2rem;
`;

const ScheduleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 144rem;
  padding: 8rem 0 4rem 0;
  background-color: ${({ theme: { color } }) => color.greyScale.offWhite};
`;
const ScheduleLeftRuler = styled.div`
  width: 107rem;
  display: flex;
  justify-content: flex-start;
`;

const ScheduleQuery = graphql`
  query ScheduleQuery {
    mdx(frontmatter: { templateKey: { eq: "masters_schedule" } }) {
      frontmatter {
        progress {
          label
          title
          subtitle
          description
        }
        waiterApplyUrl
        applyUrl
        waiterApplyUrlBtnText
        applyBtnText
      }
    }
  }
`;

export default CourseSchedule;
