import { UserTable } from "./c-user-table";
import { AttachNew } from "./c-user-modal";
import { SearchBar } from "./c-search-bar";
import { Filter } from "./c-filter";
import { Header } from "@/components/header";

export default function UserPage() {
    return(
        <>
            <Header />
            <main className="container mx-auto px-4 py-6">
                <div className="flex flex-row justify-between mt-10 mb-10 max-w-7xl mx-auto">
                    <SearchBar />
                    <Filter />
                    <AttachNew />
                </div>
                <div className="flex justify-center max-w-7xl mx-auto">
                    <UserTable />
                </div>
            </main>
        </>
    )
};