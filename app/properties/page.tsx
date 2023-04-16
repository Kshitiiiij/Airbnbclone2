import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import {getCurrentUser} from "../actions/getCurrentuser";
import getReservations from "../actions/getReservations";
import PropertiesClient from "./PropertiesClient"
import getCurrentListings from "../actions/getCurrentListings";

const PropertiesPage = async() => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly> 
                <EmptyState 
                title="Unauthroized"
                subtitle="Please login"
                />
            </ClientOnly>
        )
    }
    const listings = await getCurrentListings({
        userId: currentUser.id
    })

    if(listings.length===0){
        return (
            <ClientOnly>
                <EmptyState 
                title="No properties found"
                subtitle="Looks like you have no properties"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage