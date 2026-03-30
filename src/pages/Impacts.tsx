import PageHero from '@/_components/PageHero'
import React from 'react'

const Impacts = () => {
  return (
    <div>
        <div className="">
            {/* Page Hero */}
            <PageHero
                tag="Impacts"
                title="Stories of Change & "
                accentWord="Resilience"
                description="Real impact happens where rural resilience meets urban innovation. Here is what our community partners have to say."
                crumbs={[{ label: "Impacts" }]}
            />
        </div>
    </div>
  )
}

export default Impacts