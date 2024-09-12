import CompaniesClient from "../../../components/ProductList";

export interface Company {
    id: number;
    name: string;
    logo: string;
    openDealsAmount: number;
}

export interface CompaniesClientProps {
    initialCompanies: Company[];
}

// This would typically come from a database or API
const fetchCompanies = async (): Promise<Company[]> => {
    // Replace this with your actual data fetching logic
    return [
        { id: 1, name: 'Company A', logo: '/path/to/logo1.png', openDealsAmount: 10000 },
        { id: 2, name: 'Company B', logo: '/path/to/logo2.png', openDealsAmount: 20000 },
        // Add more companies as needed
    ];
};

export default async function CompaniesPage() {
    const initialCompanies = await fetchCompanies();
    return (
        <div>
            <CompaniesClient initialCompanies={initialCompanies} />
        </div>
    );
}