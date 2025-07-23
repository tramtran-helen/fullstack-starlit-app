'use client'

const Collections = ({ collections = [], entriesByCollection }) => {
    return <section>
        <h2>Collections</h2>
        <div>
            <CollectionPreview/>
        </div>
    </section>
}