import React, { createContext, useState, useEffect, useContext } from "react";
import { apiTindo } from "@/services/apiTindo";
import { DataContextType } from "@/types/useDataContext.types";
import { useParams } from "next/navigation";

const DataContext = createContext<DataContextType>({
    galeria: null,
    config: null,
    dynamicData: null,
    loading: true,
    error: null,
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

    const { tipo, id } = useParams();
    const [galeria, setGaleria] = useState(null);
    const [config, setConfig] = useState(null);
    const [dynamicData, setDynamicData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const responseConfig = await apiTindo.get("/configuracao");
                const responseGaleria = await apiTindo.get("/galeria");

                setGaleria(responseGaleria.data);
                setConfig(responseConfig.data);

            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchDynamicData = async () => {
            try {
                setLoading(true);
                const response = await apiTindo.get(`/${tipo}/${id}`);
                setDynamicData(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        if (tipo && id) fetchDynamicData();
    }, [tipo, id]);

    return (
        <DataContext.Provider value={{ config, galeria, loading, error, dynamicData }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);