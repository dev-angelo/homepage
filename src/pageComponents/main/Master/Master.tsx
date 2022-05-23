import React from "react";
import styled, { useTheme } from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
// Type
import { MasterType } from "@type/Master";
// Typography
import { MBody, SBody, XLBody, XSBody } from "typography";
// Components
import { TitleSet, TabNavigationBar } from "components";
// Assets
import icons from "assets/images/icons";
import { SUBTITLE, TITLE, DESCRIPTION } from "assets/static/phrases";

const Master: React.FC = () => {
  const theme = useTheme();

  const data = useStaticQuery(MasterQuery);
  const { mdx } = data;
  const { frontmatter } = mdx;
  const { masters }: { masters: MasterType[] } = frontmatter;

  const fields = masters.map((master) => master.field);

  const [masterIntroduce, setMasterIntroduce] = React.useState<MasterType>(masters[0]);

  const handleTabClick = (index: number) => {
    setMasterIntroduce(masters[index]);
  };

  return (
    <MasterWrapper>
      <div style={{ width: "106.2rem", padding: "0 18.9rem", margin: "0 auto" }}>
        <TitleSet subtitle={SUBTITLE.MASTER} title={TITLE.MASTER} />
        <MBody
          style={{
            color: theme.color.greyScale.grey2,
            paddingTop: "2.4rem",
            paddingBottom: "4rem",
          }}
        >
          {DESCRIPTION.MASTER}
        </MBody>
        <TabNavigationBar titles={fields} onIndexChanged={handleTabClick} />
      </div>
      <div style={{ backgroundColor: theme.color.greyScale.offWhite }}>
        <MasterInformationWrapper>
          <MasterImg alt="profile" />
          <IntroduceWrapper>
            <Introduce>
              <NicknameWrapper>
                <XLBody>{masterIntroduce.name}</XLBody>
                <XSBody style={{ color: `${theme.color.greyScale.grey2}`, paddingLeft: "0.8rem" }}>
                  {masterIntroduce.introduce}
                </XSBody>
              </NicknameWrapper>
              <MBody bold>{masterIntroduce.nutshell}</MBody>
              <CareerWrapper>
                {masterIntroduce.careers?.map((career) => (
                  <li key={career}>
                    <SBody
                      style={{
                        display: "inline",
                        verticalAlign: "middle",
                        color: theme.color.greyScale.grey1,
                      }}
                    >
                      {career}
                    </SBody>
                  </li>
                ))}
              </CareerWrapper>
            </Introduce>
            {masterIntroduce.schedules && (
              <ScheduleWrapper>
                <MBody bold style={{ padding: "3.2rem 0 2.4rem 0" }}>
                  {TITLE.SCHEDULE}
                </MBody>
                <ScheduleList>
                  {masterIntroduce.schedules.map(({ image, title, subtitle }) => (
                    <Schedule key={title}>
                      <CourseImage src={icons[image]} alt="course" />
                      <CourseTitleWrapper>
                        <TitleWrapper>
                          <XSBody>{title}</XSBody>
                        </TitleWrapper>
                        <SubtitleWrapper>
                          <MBody>{subtitle}</MBody>
                        </SubtitleWrapper>
                      </CourseTitleWrapper>
                    </Schedule>
                  ))}
                </ScheduleList>
              </ScheduleWrapper>
            )}
          </IntroduceWrapper>
        </MasterInformationWrapper>
      </div>
    </MasterWrapper>
  );
};

const MasterWrapper = styled.div`
  width: 100%;
  padding-bottom: 20rem;
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const MasterInformationWrapper = styled.div`
  width: 106.2rem;
  display: flex;
  padding: 5.6rem 18.9rem;
  margin: 0 auto;
  & > *:not(:last-child) {
    margin-right: 7.8rem;
  }
`;

const IntroduceWrapper = styled.div`
  height: 43.6rem;
  min-height: 0;
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 3.2rem;
  }
`;

const Introduce = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 1.6rem;
  }
`;

const NicknameWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const MasterImg = styled.img`
  width: 41rem;
  height: 41rem;
`;

const CareerWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: disc;
  list-style-position: inside;
  & > *:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`;

const ScheduleWrapper = styled.div`
  width: 52rem;
  border-top: 0.1rem solid ${({ theme: { color } }) => color.greyScale.grey3};
`;

const ScheduleList = styled.ul`
  display: flex;
  & > *:not(:last-child) {
    margin-right: 2.4rem;
  }
`;

const Schedule = styled.li`
  width: 24.8rem;
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 1.6rem;
  }
`;

const CourseImage = styled.img`
  width: 3.4rem;
  height: 3.4rem;
  padding: 0.2rem 0.2rem;
  border: 0.1rem solid black;
  border-radius: 0.8rem;
  border-color: ${({ theme: { color } }) => color.greyScale.grey3};
`;

const CourseTitleWrapper = styled.div`
  display: flex;
  height: 4.4rem;
  flex-direction: column;
  &:hover {
    & > *:first-child {
      height: 1.7rem;
      line-height: 1.7rem;
      border-bottom: 0.1rem solid ${({ theme: { color } }) => color.greyScale.grey1};
    }
    & > *:last-child {
      height: 2.5rem;
      line-height: 2.5rem;
      border-bottom: 0.1rem solid ${({ theme: { color } }) => color.greyScale.grey1};
    }
  }
`;

const TitleWrapper = styled.div`
  width: fit-content;
  color: ${({ theme: { color } }) => color.greyScale.grey1};
`;

const SubtitleWrapper = styled.div`
  width: fit-content;
  color: ${({ theme: { color } }) => color.greyScale.black};
`;

const MasterQuery = graphql`
  query MasterQuery {
    mdx(frontmatter: { templateKey: { eq: "main_masters" } }) {
      frontmatter {
        masters {
          image
          field
          name
          introduce
          nutshell
          careers
          schedules {
            title
            subtitle
            image
          }
        }
      }
    }
  }
`;

export default Master;
