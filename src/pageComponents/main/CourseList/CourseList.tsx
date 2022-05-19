import React from "react";
import styled from "styled-components";
// Components
import { LinkButton } from "components";
// Assets
import icons from "assets/images/icons";
import { LINK_DESCRIPTION, LINK } from "assets/static/phrases";
import { INTERNAL } from "assets/static/urls";

const CourseList: React.FC = () => {
  return (
    <CourseWrapper>
      <LinkButton
        to={INTERNAL.MASTERS}
        title={LINK.MASTERS}
        description={LINK_DESCRIPTION.MASTERS}
        icon={icons.masters}
      />
      <LinkButton
        to={INTERNAL.CODE_TOGETHER}
        title={LINK.CODE_TOGETHER}
        description={LINK_DESCRIPTION.CODE_TOGETHER}
        icon={icons.codeTogether}
      />
    </CourseWrapper>
  );
};

const CourseWrapper = styled.ul`
  margin-top: 8rem;
  margin-bottom: 15rem;
  display: flex;
  justify-content: center;
  & > *:not(:last-child) {
    margin-right: 2.4rem;
  }
`;

export default CourseList;
