import DonateHero from '@/_components/DonateHero'
import DreamHubsFeatures from '@/_components/DreamHubsFeatures'
import DreamHubsIntro from '@/_components/DreamHubsIntro'
import MisVis from '@/_components/MisVis'
import OurBook from '@/_components/OurBook'
import PageHero from '@/_components/PageHero'
import WhyDreamHubs from '@/_components/WhyDreamHubs'
import React from 'react'

const DreamHubs = () => {
    return (
        <div>
            {/* Page Hero */}
            <div className="">
                <PageHero
                    tag="Dream Hubs"
                    title="Empowering Rural Innovators"
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
                <DonateHero />
            </div>
        </div>
    )
}

export default DreamHubs