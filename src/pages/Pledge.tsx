import OurBook from "@/_components/OurBook"
import PageHero from "@/_components/PageHero"

const Pledge = () => {
  return (
    <div>
        {/* PageHero */}
        <div className="">
        <PageHero
          tag="Our Pledge"
          title="Commitment to Rural Empowerment"
          accentWord="Pledge"
          description="At Rurban Africa, we pledge to empower rural communities through sustainable development, education, and innovation. We are committed to creating lasting impact and fostering growth in Nigeria and across Africa."
          crumbs={[{ label: "Our Pledge" }]}
        />
       </div>

       <OurBook />
    </div>
  )
}

export default Pledge