import DonateHero from "@/_components/DonateHero"
import DreamHubsIntro from "@/_components/DreamHubsIntro"
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
          title="Our Story, Mission, and Impact"
          accentWord="Impact"
          description="Discover how Rurban Africa is transforming rural communities through sustainable development, education, and empowerment initiatives across Nigeria and Africa."
          crumbs={[{ label: "About" }]}
        />
      </div>
      <div className="">
        <DreamHubsIntro />
      </div>
      <div className="">
        <WhyDreamHubs />
      </div>
      <div className="">
        <MisVis />
      </div>

      <div className="">
        <OurBook />
      </div>
      <div className="">
        <DonateHero />
      </div>
    </div>
  )
}

export default About