import { useEffect } from "react";
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";

const Previas = ({ id, nodes, edges }) => {
    useEffect(() => {
        // create a network
        const container = document.getElementById(id);
        const data = {
            nodes: new DataSet(
                nodes.map(
                    item => ({ 
                        id: item.id, 
                        label: item.label, 
                        font: { 
                            size: 12, 
                            color: "red", 
                            face: "arial" 
                        } 
                    })
                )
            ),
            edges: new DataSet(
                edges.map(
                    item => ({ 
                        from: item.from, 
                        to: item.to, 
                        label: item.label,
                        arrows: "to", 
                        dashes: item.requisito === "aprobado" ? false : [5, 5],
                        color: item.requisito === "aprobado" ? "blue" : "red",
                        font: { 
                            size: 12, 
                            color: "red", 
                            face: "arial" 
                        }
                    })
                )
            )
        };
        const options = {
        nodes: {
            shape: "box"
        },
        };
        const network = new Network(container, data, options);
        // Cleanup function to destroy the network when the component unmounts
        return () => {
        network.destroy();
        };
    }, [id, nodes, edges]); // Dependency array ensures the effect runs only once after the initial render
    return <div className="container-previas" id={id} />;
    };

export default Previas;
