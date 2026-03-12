import DonateHero from "@/_components/DonateHero"
import DreamHubsFeatures from "@/_components/DreamHubsFeatures"
import DreamHubsIntro from "@/_components/DreamHubsIntro"
import MeetFounder from "@/_components/MeetFounder"
import MisVis from "@/_components/MisVis"
import OurBook from "@/_components/OurBook"
import PageHero from "@/_components/PageHero"
import WhyDreamHubs from "@/_components/WhyDreamHubs"

const About = () => {
  return (
    <div>
      {/* Page Hero for About */}
      <div className="">
        <PageHero
          tag="About Rurban Africa"
          title="Our Story, Mission, and"
          accentWord="Impact"
          description="Discover how Rurban Africa is transforming rural communities through sustainable development, education, and empowerment initiatives across Nigeria and Africa."
          crumbs={[{ label: "About" }]}
        />
      </div>
      <div className="">
        <DreamHubsIntro />
      </div>
      <div className="" id="vision">
        <MisVis />
      </div>
      <div className="">
        <MeetFounder />
      </div>
      {/* <div className="">
        <DreamHubsFeatures />
      </div>

      <div className="">
        <OurBook />
      </div> */}
      <div className="">
        <DonateHero />
      </div>
    </div>
  )
}

export default About