import DonateHero from '@/_components/DonateHero'
import DreamHubsFeatures from '@/_components/DreamHubsFeatures'
import DreamHubsIntro from '@/_components/DreamHubsIntro'
import PageHero from '@/_components/PageHero'
import WhyDreamHubs from '@/_components/WhyDreamHubs'
import DreamHubsSponsorship from '@/_components/DreamHubsSponsorship.tsx'

const DreamHubs = () => {
    return (
        <div>
            {/* Page Hero */}
            <div className="">
                <PageHero
                    tag="Dream Hubs"
                    title="Empowering Rural"
                    accentWord="Innovators"
                    description="Discover how Rurban Africa's Dream Hubs are transforming rural communities into vibrant centers of innovation, entrepreneurship, and sustainable development across Nigeria and Africa."
                    crumbs={[{ label: "Dream Hubs" }]}
                />
            </div>

            <div className="">
                <DreamHubsIntro />
            </div>

            <div className="">
                <DreamHubsFeatures />
            </div>

            <div className="">
                <WhyDreamHubs />
            </div>

            <div className="">
                <DreamHubsSponsorship />
            </div>

            <div className="">
                <DonateHero />
            </div>
        </div>
    )
}

export default DreamHubs