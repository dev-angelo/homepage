import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
// Type
import { JobPositionType } from "@type/JobPosition";
// Typography
import { LDisplay } from "typography";
// Components
import { DropdownItem, TagNavigationBar } from "components";
// Assets
import backgrounds from "assets/images/backgrounds";
import { TITLE } from "assets/static/phrases";
import { strainMdxInfo } from "lib/utils";

const JobPosition: React.FC = () => {
  const data = useStaticQuery(JobPositionQuery);
  const { jobPositions }: { jobPositions: JobPositionType[] } = strainMdxInfo(data);

  const categories = new Set<string>(["전체"]);
  jobPositions.forEach((jobPosition) => categories.add(jobPosition.category));

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [faqList, setFAQList] = React.useState<JobPositionType[]>(jobPositions);

  React.useEffect(() => {
    if (currentIndex === 0) {
      setFAQList(jobPositions);
      return;
    }

    const category = Array.from(categories)[currentIndex];
    const filteredLists = jobPositions.filter((jobPosition) => jobPosition.category === category);
    setFAQList(filteredLists);
  }, [currentIndex]);

  return (
    <JobPositionWrapper image={backgrounds["diamond"]}>
      <JobPositionContentWrapper>
        <LDisplay style={{ paddingTop: "16rem", paddingBottom: "3.2rem" }}>{TITLE.APPLY}</LDisplay>
        <TagNavigationBar titles={Array.from(categories)} onIndexChanged={setCurrentIndex} />
        <DropdownItemWrapper>
          {faqList.map(({ category, title, content, editDate }) => (
            <DropdownItem key={title} short {...{ category, title, content, editDate }} />
          ))}
        </DropdownItemWrapper>
      </JobPositionContentWrapper>
    </JobPositionWrapper>
  );
};

const JobPositionWrapper = styled.div<{ image: string }>`
  width: 100%;
  min-width: 144rem;
  padding-bottom: 16rem;
  background-image: ${({ image }) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: 100%;
  color: ${({ theme: { color } }) => color.greyScale.black};
  white-space: pre-line;
  text-align: start;
`;

const JobPositionContentWrapper = styled.div`
  width: 106.2rem;
  padding: 0 18.9rem;
  margin: 0 auto;
`;

const DropdownItemWrapper = styled.ul`
  margin-top: 4.7rem;
  padding: 0.8rem 4.8rem 4.8rem 4.8rem;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme: { color } }) => color.greyScale.white};
`;

const JobPositionQuery = graphql`
  query JobPositionQuery {
    mdx(frontmatter: { templateKey: { eq: "recruit_jobPositions" } }) {
      frontmatter {
        jobPositions {
          category
          title
          content
          editDate
        }
      }
    }
  }
`;

export default JobPosition;
