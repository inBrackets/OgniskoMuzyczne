import React, { useState } from 'react';
import axios from 'axios';

function IPScanner() {
    const [ipList, setIpList] = useState([]);
    const [loading, setLoading] = useState(false);

    const scanIPs = async () => {
        setLoading(true);
        const ips = []; // List to store IPs that respond with status 200
        const baseRange = '192.168.';
        const ipRange3 = 10; // Define the range 1-255 for both segments
        const ipRange4 = 255; // Define the range 1-255 for both segments

        const requests = [];

        for (let i = 1; i <= ipRange3; i++) {
            for (let j = 1; j <= ipRange4; j++) {
                const ip = `${baseRange}${i}.${j}`;
                requests.push(
                    axios.get(`http://${ip}:8080/api/v1/students`, {
                        timeout: 1000, // Set a timeout to avoid long waiting times
                    })
                        .then(response => {
                            if (response.status === 200) {
                                ips.push(ip);
                            }
                        })
                        .catch(() => {
                            // Ignore errors since many IPs won't respond
                        })
                );

                // Limit the number of concurrent requests to avoid overloading the network
                if (requests.length === 50) {
                    await Promise.all(requests);  // Wait for the batch to finish
                    requests.length = 0;  // Clear the array for the next batch
                }
            }
        }

        // Wait for the final batch to complete
        if (requests.length > 0) {
            await Promise.all(requests);
        }

        setIpList(ips);
        setLoading(false);
    };

    return (
        <div>
            <h1>IP Scanner</h1>
            <button onClick={scanIPs} disabled={loading}>
                {loading ? 'Scanning...' : 'Start Scan'}
            </button>
            <ul>
                {ipList.map((ip) => (
                    <li key={ip}>{ip}</li>
                ))}
            </ul>
        </div>
    );
}

export default IPScanner;