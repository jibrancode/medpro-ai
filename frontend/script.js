document.addEventListener('DOMContentLoaded', () => {
    // --- Global Application State (Storage) ---
    let currentUser = null;
    let notifications = JSON.parse(localStorage.getItem('amedpro_notifications') || '[]');

    // Hackathon Requirement: Ensure System Logs exist
    if (notifications.length === 0) {
        const startupLogs = [
            { type: 'stock_update', title: 'System Initialized', message: 'aMedPro Mock Database (SQLite) connected.', time: now.toLocaleTimeString() },
            { type: 'stock_update', title: 'Webhook Bridge Active', message: 'Ready to execute real-world tool actions.', time: now.toLocaleTimeString() }
        ];
        notifications = [...startupLogs];
        localStorage.setItem('amedpro_notifications', JSON.stringify(notifications));
    }



    // Helper to get dates for demo data relative to today
    const now = new Date();
    const futureDate1 = new Date(now); futureDate1.setDate(now.getDate() + 30);
    const futureDate2 = new Date(now); futureDate2.setDate(now.getDate() + 90);
    const nearExpiryDate = new Date(now); nearExpiryDate.setDate(now.getDate() + 1);

    const fmt = d => d.toISOString().split('T')[0];

    const dummyMedicinesBackup = [

        {
            "id": 1,
            "name": "Ranitidine 10mg",
            "type": "Medicine",
            "price": "\u20b951.7",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-11-22",
            "stock": 148
        },
        {
            "id": 2,
            "name": "Ciprofloxacin 650mg",
            "type": "Medicine",
            "price": "\u20b9216.9",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-06-14",
            "stock": 154
        },
        {
            "id": 3,
            "name": "Metformin 10mg",
            "type": "Medicine",
            "price": "\u20b9463.67",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-04-08",
            "stock": 187
        },
        {
            "id": 4,
            "name": "Ranitidine 500mg",
            "type": "Medicine",
            "price": "\u20b9153.08",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-04-03",
            "stock": 93
        },
        {
            "id": 5,
            "name": "Clopidogrel 250mg",
            "type": "Medicine",
            "price": "\u20b9188.79",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-07-20",
            "stock": 38
        },
        {
            "id": 6,
            "name": "Azithromycin 500mg",
            "type": "Medicine",
            "price": "\u20b9339.5",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-01-04",
            "stock": 15
        },
        {
            "id": 7,
            "name": "Vitamin C 250mg",
            "type": "Medicine",
            "price": "\u20b9232.36",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-10-11",
            "stock": 132
        },
        {
            "id": 8,
            "name": "Atorvastatin 10mg",
            "type": "Medicine",
            "price": "\u20b9209.59",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-09-07",
            "stock": 158
        },
        {
            "id": 9,
            "name": "Losartan 100mg",
            "type": "Medicine",
            "price": "\u20b9418.05",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-01-07",
            "stock": 35
        },
        {
            "id": 10,
            "name": "Pantoprazole 500mg",
            "type": "Medicine",
            "price": "\u20b998.37",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2030-02-23",
            "stock": 141
        },
        {
            "id": 11,
            "name": "Vitamin C 100mg",
            "type": "Medicine",
            "price": "\u20b949.71",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-06-21",
            "stock": 180
        },
        {
            "id": 12,
            "name": "Dolo 10mg",
            "type": "Medicine",
            "price": "\u20b997.37",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2030-04-05",
            "stock": 75
        },
        {
            "id": 13,
            "name": "Vitamin C 5mg",
            "type": "Medicine",
            "price": "\u20b9320.79",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-06-09",
            "stock": 32
        },
        {
            "id": 14,
            "name": "Aspirin 5mg",
            "type": "Medicine",
            "price": "\u20b9485.32",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-07-29",
            "stock": 142
        },
        {
            "id": 15,
            "name": "Metformin 100mg",
            "type": "Medicine",
            "price": "\u20b9323.78",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-07-29",
            "stock": 47
        },
        {
            "id": 16,
            "name": "Diclofenac 250mg",
            "type": "Medicine",
            "price": "\u20b9115.59",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-05-05",
            "stock": 56
        },
        {
            "id": 17,
            "name": "Diclofenac 10mg",
            "type": "Medicine",
            "price": "\u20b9410.17",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-12-31",
            "stock": 40
        },
        {
            "id": 18,
            "name": "Paracetamol 100mg",
            "type": "Medicine",
            "price": "\u20b9434.33",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2030-01-22",
            "stock": 152
        },
        {
            "id": 19,
            "name": "Ranitidine 250mg",
            "type": "Medicine",
            "price": "\u20b923.7",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-09-16",
            "stock": 120
        },
        {
            "id": 20,
            "name": "Losartan 5mg",
            "type": "Medicine",
            "price": "\u20b9410.75",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-04-14",
            "stock": 138
        },
        {
            "id": 21,
            "name": "Losartan 10mg",
            "type": "Medicine",
            "price": "\u20b9104.63",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-07-08",
            "stock": 171
        },
        {
            "id": 22,
            "name": "Omeprazole 500mg",
            "type": "Medicine",
            "price": "\u20b9208.89",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-06-16",
            "stock": 122
        },
        {
            "id": 23,
            "name": "Hydroxyzine 650mg",
            "type": "Medicine",
            "price": "\u20b9171.86",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-02-09",
            "stock": 139
        },
        {
            "id": 24,
            "name": "Vitamin C 650mg",
            "type": "Medicine",
            "price": "\u20b9332.81",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-05-30",
            "stock": 131
        },
        {
            "id": 25,
            "name": "Vitamin C 250mg",
            "type": "Medicine",
            "price": "\u20b9436.61",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-06-29",
            "stock": 95
        },
        {
            "id": 26,
            "name": "Metformin 10mg",
            "type": "Medicine",
            "price": "\u20b9329.29",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-04-01",
            "stock": 183
        },
        {
            "id": 27,
            "name": "Amoxicillin 100mg",
            "type": "Medicine",
            "price": "\u20b9491.65",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-05-28",
            "stock": 68
        },
        {
            "id": 28,
            "name": "Omeprazole 650mg",
            "type": "Medicine",
            "price": "\u20b9363.68",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-02-10",
            "stock": 23
        },
        {
            "id": 29,
            "name": "Amoxicillin 500mg",
            "type": "Medicine",
            "price": "\u20b9149.42",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-06-17",
            "stock": 59
        },
        {
            "id": 30,
            "name": "Omeprazole 10mg",
            "type": "Medicine",
            "price": "\u20b926.57",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-07-08",
            "stock": 123
        },
        {
            "id": 31,
            "name": "Dolo 5mg",
            "type": "Medicine",
            "price": "\u20b9486.76",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-12-26",
            "stock": 55
        },
        {
            "id": 32,
            "name": "Atorvastatin 500mg",
            "type": "Medicine",
            "price": "\u20b9353.83",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-03-28",
            "stock": 169
        },
        {
            "id": 33,
            "name": "Atorvastatin 5mg",
            "type": "Medicine",
            "price": "\u20b998.73",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-07-30",
            "stock": 82
        },
        {
            "id": 34,
            "name": "Pantoprazole 250mg",
            "type": "Medicine",
            "price": "\u20b9374.48",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-11-27",
            "stock": 143
        },
        {
            "id": 35,
            "name": "Ciprofloxacin 5mg",
            "type": "Medicine",
            "price": "\u20b9305.3",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-08-17",
            "stock": 106
        },
        {
            "id": 36,
            "name": "Clopidogrel 10mg",
            "type": "Medicine",
            "price": "\u20b9405.4",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-09-21",
            "stock": 62
        },
        {
            "id": 37,
            "name": "Diclofenac 5mg",
            "type": "Medicine",
            "price": "\u20b927.01",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-01-15",
            "stock": 61
        },
        {
            "id": 38,
            "name": "Levocetirizine 5mg",
            "type": "Medicine",
            "price": "\u20b9464.69",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-01-06",
            "stock": 82
        },
        {
            "id": 39,
            "name": "Vitamin C 500mg",
            "type": "Medicine",
            "price": "\u20b956.61",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-06-10",
            "stock": 190
        },
        {
            "id": 40,
            "name": "Clopidogrel 5mg",
            "type": "Medicine",
            "price": "\u20b9308.16",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-12-10",
            "stock": 79
        },
        {
            "id": 41,
            "name": "Dolo 10mg",
            "type": "Medicine",
            "price": "\u20b9131.25",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-04-16",
            "stock": 43
        },
        {
            "id": 42,
            "name": "Amlodipine 100mg",
            "type": "Medicine",
            "price": "\u20b9325.02",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-09-30",
            "stock": 31
        },
        {
            "id": 43,
            "name": "Metformin 5mg",
            "type": "Medicine",
            "price": "\u20b9239.85",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-03-01",
            "stock": 124
        },
        {
            "id": 44,
            "name": "Clopidogrel 5mg",
            "type": "Medicine",
            "price": "\u20b923.48",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-03-25",
            "stock": 21
        },
        {
            "id": 45,
            "name": "Cetirizine 10mg",
            "type": "Medicine",
            "price": "\u20b9391.79",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-09-26",
            "stock": 159
        },
        {
            "id": 46,
            "name": "Losartan 5mg",
            "type": "Medicine",
            "price": "\u20b9127.55",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-09-01",
            "stock": 165
        },
        {
            "id": 47,
            "name": "Azithromycin 650mg",
            "type": "Medicine",
            "price": "\u20b9368.06",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-07-19",
            "stock": 43
        },
        {
            "id": 48,
            "name": "Clopidogrel 500mg",
            "type": "Medicine",
            "price": "\u20b9220.0",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-09-22",
            "stock": 17
        },
        {
            "id": 49,
            "name": "Vitamin C 250mg",
            "type": "Medicine",
            "price": "\u20b9238.45",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-04-20",
            "stock": 157
        },
        {
            "id": 50,
            "name": "Amlodipine 100mg",
            "type": "Medicine",
            "price": "\u20b934.98",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-05-05",
            "stock": 42
        },
        {
            "id": 51,
            "name": "Omeprazole 250mg",
            "type": "Medicine",
            "price": "\u20b9206.55",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-09-27",
            "stock": 160
        },
        {
            "id": 52,
            "name": "Atorvastatin 250mg",
            "type": "Medicine",
            "price": "\u20b9388.94",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-08-23",
            "stock": 147
        },
        {
            "id": 53,
            "name": "Diclofenac 10mg",
            "type": "Medicine",
            "price": "\u20b9492.67",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-06-09",
            "stock": 31
        },
        {
            "id": 54,
            "name": "Amlodipine 100mg",
            "type": "Medicine",
            "price": "\u20b9233.14",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-09-06",
            "stock": 190
        },
        {
            "id": 55,
            "name": "Atorvastatin 100mg",
            "type": "Medicine",
            "price": "\u20b9477.55",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-04-14",
            "stock": 60
        },
        {
            "id": 56,
            "name": "Atorvastatin 500mg",
            "type": "Medicine",
            "price": "\u20b9448.42",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-05-22",
            "stock": 97
        },
        {
            "id": 57,
            "name": "Ciprofloxacin 10mg",
            "type": "Medicine",
            "price": "\u20b934.59",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2030-02-13",
            "stock": 111
        },
        {
            "id": 58,
            "name": "Diclofenac 250mg",
            "type": "Medicine",
            "price": "\u20b9138.86",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-11-02",
            "stock": 75
        },
        {
            "id": 59,
            "name": "Ciprofloxacin 5mg",
            "type": "Medicine",
            "price": "\u20b9133.84",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-03-26",
            "stock": 166
        },
        {
            "id": 60,
            "name": "Diclofenac 250mg",
            "type": "Medicine",
            "price": "\u20b9375.36",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-05-16",
            "stock": 150
        },
        {
            "id": 61,
            "name": "Ciprofloxacin 250mg",
            "type": "Medicine",
            "price": "\u20b9300.25",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-03-18",
            "stock": 110
        },
        {
            "id": 62,
            "name": "Omeprazole 650mg",
            "type": "Medicine",
            "price": "\u20b9220.44",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-05-18",
            "stock": 34
        },
        {
            "id": 63,
            "name": "Amoxicillin 650mg",
            "type": "Medicine",
            "price": "\u20b9471.65",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-08-24",
            "stock": 30
        },
        {
            "id": 64,
            "name": "Hydroxyzine 250mg",
            "type": "Medicine",
            "price": "\u20b9491.17",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-02-20",
            "stock": 60
        },
        {
            "id": 65,
            "name": "Dolo 100mg",
            "type": "Medicine",
            "price": "\u20b9101.52",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2030-04-02",
            "stock": 113
        },
        {
            "id": 66,
            "name": "Vitamin C 650mg",
            "type": "Medicine",
            "price": "\u20b9477.37",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-04-22",
            "stock": 198
        },
        {
            "id": 67,
            "name": "Amlodipine 100mg",
            "type": "Medicine",
            "price": "\u20b934.45",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-05-18",
            "stock": 35
        },
        {
            "id": 68,
            "name": "Ranitidine 10mg",
            "type": "Medicine",
            "price": "\u20b9367.71",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-06-22",
            "stock": 82
        },
        {
            "id": 69,
            "name": "Dolo 100mg",
            "type": "Medicine",
            "price": "\u20b9463.79",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-08-23",
            "stock": 17
        },
        {
            "id": 70,
            "name": "Clopidogrel 100mg",
            "type": "Medicine",
            "price": "\u20b9320.61",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-08-12",
            "stock": 26
        },
        {
            "id": 71,
            "name": "Levocetirizine 5mg",
            "type": "Medicine",
            "price": "\u20b9243.75",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-09-19",
            "stock": 88
        },
        {
            "id": 72,
            "name": "Atorvastatin 250mg",
            "type": "Medicine",
            "price": "\u20b9224.61",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-12-07",
            "stock": 46
        },
        {
            "id": 73,
            "name": "Aspirin 500mg",
            "type": "Medicine",
            "price": "\u20b9480.53",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-07-26",
            "stock": 135
        },
        {
            "id": 74,
            "name": "Atorvastatin 5mg",
            "type": "Medicine",
            "price": "\u20b9360.93",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-06-10",
            "stock": 133
        },
        {
            "id": 75,
            "name": "Metformin 500mg",
            "type": "Medicine",
            "price": "\u20b9279.93",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-10-18",
            "stock": 192
        },
        {
            "id": 76,
            "name": "Vitamin C 10mg",
            "type": "Medicine",
            "price": "\u20b9434.09",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-10-31",
            "stock": 101
        },
        {
            "id": 77,
            "name": "Losartan 5mg",
            "type": "Medicine",
            "price": "\u20b9244.37",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-02-11",
            "stock": 28
        },
        {
            "id": 78,
            "name": "Hydroxyzine 250mg",
            "type": "Medicine",
            "price": "\u20b994.52",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2030-01-14",
            "stock": 144
        },
        {
            "id": 79,
            "name": "Aspirin 500mg",
            "type": "Medicine",
            "price": "\u20b9381.61",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-12-01",
            "stock": 178
        },
        {
            "id": 80,
            "name": "Aspirin 650mg",
            "type": "Medicine",
            "price": "\u20b9400.33",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-04-17",
            "stock": 169
        },
        {
            "id": 81,
            "name": "Metformin 10mg",
            "type": "Medicine",
            "price": "\u20b996.53",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-02-02",
            "stock": 114
        },
        {
            "id": 82,
            "name": "Ciprofloxacin 5mg",
            "type": "Medicine",
            "price": "\u20b9451.78",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-10-24",
            "stock": 157
        },
        {
            "id": 83,
            "name": "Amlodipine 100mg",
            "type": "Medicine",
            "price": "\u20b9306.72",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-08-14",
            "stock": 196
        },
        {
            "id": 84,
            "name": "Paracetamol 5mg",
            "type": "Medicine",
            "price": "\u20b9476.66",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-09-10",
            "stock": 148
        },
        {
            "id": 85,
            "name": "Paracetamol 10mg",
            "type": "Medicine",
            "price": "\u20b9372.84",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-05-25",
            "stock": 186
        },
        {
            "id": 86,
            "name": "Atorvastatin 100mg",
            "type": "Medicine",
            "price": "\u20b9488.63",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-07-18",
            "stock": 158
        },
        {
            "id": 87,
            "name": "Hydroxyzine 5mg",
            "type": "Medicine",
            "price": "\u20b9395.67",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-10-01",
            "stock": 172
        },
        {
            "id": 88,
            "name": "Clopidogrel 5mg",
            "type": "Medicine",
            "price": "\u20b9421.76",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-08-09",
            "stock": 146
        },
        {
            "id": 89,
            "name": "Levocetirizine 100mg",
            "type": "Medicine",
            "price": "\u20b972.3",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2030-04-03",
            "stock": 10
        },
        {
            "id": 90,
            "name": "Paracetamol 100mg",
            "type": "Medicine",
            "price": "\u20b9306.2",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-05-28",
            "stock": 19
        },
        {
            "id": 91,
            "name": "Ibuprofen 100mg",
            "type": "Medicine",
            "price": "\u20b9260.66",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-04-30",
            "stock": 102
        },
        {
            "id": 92,
            "name": "Hydroxyzine 650mg",
            "type": "Medicine",
            "price": "\u20b9342.74",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-11-22",
            "stock": 88
        },
        {
            "id": 93,
            "name": "Cetirizine 100mg",
            "type": "Medicine",
            "price": "\u20b9450.58",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-02-21",
            "stock": 99
        },
        {
            "id": 94,
            "name": "Hydroxyzine 250mg",
            "type": "Medicine",
            "price": "\u20b9189.72",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2030-03-19",
            "stock": 181
        },
        {
            "id": 95,
            "name": "Azithromycin 100mg",
            "type": "Medicine",
            "price": "\u20b9144.03",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-04-01",
            "stock": 189
        },
        {
            "id": 96,
            "name": "Amlodipine 250mg",
            "type": "Medicine",
            "price": "\u20b9218.89",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-01-15",
            "stock": 16
        },
        {
            "id": 97,
            "name": "Ibuprofen 100mg",
            "type": "Medicine",
            "price": "\u20b9351.01",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-02-05",
            "stock": 77
        },
        {
            "id": 98,
            "name": "Atorvastatin 5mg",
            "type": "Medicine",
            "price": "\u20b9262.76",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-06-27",
            "stock": 21
        },
        {
            "id": 99,
            "name": "Clopidogrel 10mg",
            "type": "Medicine",
            "price": "\u20b9196.23",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-11-28",
            "stock": 122
        },
        {
            "id": 100,
            "name": "Omeprazole 10mg",
            "type": "Medicine",
            "price": "\u20b996.95",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-11-27",
            "stock": 101
        },
        {
            "id": 101,
            "name": "Azithromycin 650mg",
            "type": "Medicine",
            "price": "\u20b9406.14",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-04-13",
            "stock": 48
        },
        {
            "id": 102,
            "name": "Ciprofloxacin 5mg",
            "type": "Medicine",
            "price": "\u20b9476.71",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-09-19",
            "stock": 176
        },
        {
            "id": 103,
            "name": "Diclofenac 650mg",
            "type": "Medicine",
            "price": "\u20b9253.89",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-12-21",
            "stock": 62
        },
        {
            "id": 104,
            "name": "Amlodipine 650mg",
            "type": "Medicine",
            "price": "\u20b9303.52",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-04-13",
            "stock": 145
        },
        {
            "id": 105,
            "name": "Amoxicillin 10mg",
            "type": "Medicine",
            "price": "\u20b9211.29",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-11-22",
            "stock": 191
        },
        {
            "id": 106,
            "name": "Azithromycin 100mg",
            "type": "Medicine",
            "price": "\u20b9161.05",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-03-04",
            "stock": 194
        },
        {
            "id": 107,
            "name": "Hydroxyzine 500mg",
            "type": "Medicine",
            "price": "\u20b9330.61",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-04-23",
            "stock": 35
        },
        {
            "id": 108,
            "name": "Losartan 5mg",
            "type": "Medicine",
            "price": "\u20b9356.67",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-05-22",
            "stock": 19
        },
        {
            "id": 109,
            "name": "Azithromycin 250mg",
            "type": "Medicine",
            "price": "\u20b9164.9",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-12-13",
            "stock": 134
        },
        {
            "id": 110,
            "name": "Diclofenac 500mg",
            "type": "Medicine",
            "price": "\u20b9239.83",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-12-03",
            "stock": 21
        },
        {
            "id": 111,
            "name": "Hydroxyzine 10mg",
            "type": "Medicine",
            "price": "\u20b9267.6",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-03-07",
            "stock": 190
        },
        {
            "id": 112,
            "name": "Dolo 650mg",
            "type": "Medicine",
            "price": "\u20b9108.9",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-06-28",
            "stock": 143
        },
        {
            "id": 113,
            "name": "Dolo 5mg",
            "type": "Medicine",
            "price": "\u20b9311.36",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-10-20",
            "stock": 188
        },
        {
            "id": 114,
            "name": "Cetirizine 10mg",
            "type": "Medicine",
            "price": "\u20b9331.94",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-11-26",
            "stock": 170
        },
        {
            "id": 115,
            "name": "Vitamin C 650mg",
            "type": "Medicine",
            "price": "\u20b964.56",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-09-15",
            "stock": 164
        },
        {
            "id": 116,
            "name": "Dolo 100mg",
            "type": "Medicine",
            "price": "\u20b935.18",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-12-09",
            "stock": 97
        },
        {
            "id": 117,
            "name": "Ibuprofen 10mg",
            "type": "Medicine",
            "price": "\u20b9428.33",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-01-29",
            "stock": 164
        },
        {
            "id": 118,
            "name": "Hydroxyzine 650mg",
            "type": "Medicine",
            "price": "\u20b941.19",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-07-09",
            "stock": 130
        },
        {
            "id": 119,
            "name": "Clopidogrel 650mg",
            "type": "Medicine",
            "price": "\u20b961.79",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-05-26",
            "stock": 87
        },
        {
            "id": 120,
            "name": "Omeprazole 5mg",
            "type": "Medicine",
            "price": "\u20b9294.55",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-04-22",
            "stock": 62
        },
        {
            "id": 121,
            "name": "Amlodipine 10mg",
            "type": "Medicine",
            "price": "\u20b9115.63",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-07-05",
            "stock": 49
        },
        {
            "id": 122,
            "name": "Ibuprofen 650mg",
            "type": "Medicine",
            "price": "\u20b9416.22",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-01-11",
            "stock": 188
        },
        {
            "id": 123,
            "name": "Atorvastatin 650mg",
            "type": "Medicine",
            "price": "\u20b992.73",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-09-09",
            "stock": 40
        },
        {
            "id": 124,
            "name": "Omeprazole 100mg",
            "type": "Medicine",
            "price": "\u20b9321.06",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-01-07",
            "stock": 162
        },
        {
            "id": 125,
            "name": "Paracetamol 650mg",
            "type": "Medicine",
            "price": "\u20b9345.38",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-02-09",
            "stock": 124
        },
        {
            "id": 126,
            "name": "Diclofenac 5mg",
            "type": "Medicine",
            "price": "\u20b938.44",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-09-19",
            "stock": 200
        },
        {
            "id": 127,
            "name": "Pantoprazole 250mg",
            "type": "Medicine",
            "price": "\u20b9256.36",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-04-18",
            "stock": 37
        },
        {
            "id": 128,
            "name": "Cetirizine 500mg",
            "type": "Medicine",
            "price": "\u20b9400.11",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-03-29",
            "stock": 148
        },
        {
            "id": 129,
            "name": "Paracetamol 250mg",
            "type": "Medicine",
            "price": "\u20b9278.26",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-07-05",
            "stock": 150
        },
        {
            "id": 130,
            "name": "Ciprofloxacin 250mg",
            "type": "Medicine",
            "price": "\u20b9334.22",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-03-06",
            "stock": 95
        },
        {
            "id": 131,
            "name": "Aspirin 5mg",
            "type": "Medicine",
            "price": "\u20b9283.14",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-07-01",
            "stock": 194
        },
        {
            "id": 132,
            "name": "Ibuprofen 500mg",
            "type": "Medicine",
            "price": "\u20b9236.14",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-03-04",
            "stock": 186
        },
        {
            "id": 133,
            "name": "Azithromycin 250mg",
            "type": "Medicine",
            "price": "\u20b9428.87",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-06-29",
            "stock": 51
        },
        {
            "id": 134,
            "name": "Ciprofloxacin 250mg",
            "type": "Medicine",
            "price": "\u20b9451.5",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-02-13",
            "stock": 164
        },
        {
            "id": 135,
            "name": "Omeprazole 10mg",
            "type": "Medicine",
            "price": "\u20b9363.43",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-09-26",
            "stock": 48
        },
        {
            "id": 136,
            "name": "Aspirin 250mg",
            "type": "Medicine",
            "price": "\u20b9210.62",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-09-10",
            "stock": 93
        },
        {
            "id": 137,
            "name": "Hydroxyzine 250mg",
            "type": "Medicine",
            "price": "\u20b9150.05",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-05-03",
            "stock": 44
        },
        {
            "id": 138,
            "name": "Atorvastatin 5mg",
            "type": "Medicine",
            "price": "\u20b958.12",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-07-16",
            "stock": 96
        },
        {
            "id": 139,
            "name": "Diclofenac 100mg",
            "type": "Medicine",
            "price": "\u20b9100.51",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-06-08",
            "stock": 107
        },
        {
            "id": 140,
            "name": "Paracetamol 10mg",
            "type": "Medicine",
            "price": "\u20b9178.15",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-07-27",
            "stock": 199
        },
        {
            "id": 141,
            "name": "Atorvastatin 500mg",
            "type": "Medicine",
            "price": "\u20b9142.11",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-01-28",
            "stock": 72
        },
        {
            "id": 142,
            "name": "Metformin 500mg",
            "type": "Medicine",
            "price": "\u20b9372.74",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-08-12",
            "stock": 145
        },
        {
            "id": 143,
            "name": "Hydroxyzine 5mg",
            "type": "Medicine",
            "price": "\u20b9416.31",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-02-29",
            "stock": 132
        },
        {
            "id": 144,
            "name": "Amlodipine 500mg",
            "type": "Medicine",
            "price": "\u20b975.17",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-05-06",
            "stock": 15
        },
        {
            "id": 145,
            "name": "Atorvastatin 500mg",
            "type": "Medicine",
            "price": "\u20b923.28",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-07-03",
            "stock": 39
        },
        {
            "id": 146,
            "name": "Hydroxyzine 500mg",
            "type": "Medicine",
            "price": "\u20b9472.99",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-11-02",
            "stock": 122
        },
        {
            "id": 147,
            "name": "Metformin 650mg",
            "type": "Medicine",
            "price": "\u20b9148.5",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2030-01-16",
            "stock": 47
        },
        {
            "id": 148,
            "name": "Ranitidine 500mg",
            "type": "Medicine",
            "price": "\u20b9302.28",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-04-27",
            "stock": 43
        },
        {
            "id": 149,
            "name": "Hydroxyzine 250mg",
            "type": "Medicine",
            "price": "\u20b9321.94",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-11-17",
            "stock": 67
        },
        {
            "id": 150,
            "name": "Losartan 10mg",
            "type": "Medicine",
            "price": "\u20b9134.11",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-05-06",
            "stock": 100
        },
        {
            "id": 151,
            "name": "Ranitidine 10mg",
            "type": "Medicine",
            "price": "\u20b9191.23",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-07-05",
            "stock": 29
        },
        {
            "id": 152,
            "name": "Ciprofloxacin 5mg",
            "type": "Medicine",
            "price": "\u20b9156.03",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2030-03-14",
            "stock": 36
        },
        {
            "id": 153,
            "name": "Vitamin C 10mg",
            "type": "Medicine",
            "price": "\u20b9369.32",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-03-28",
            "stock": 180
        },
        {
            "id": 154,
            "name": "Ranitidine 10mg",
            "type": "Medicine",
            "price": "\u20b9119.26",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-10-26",
            "stock": 103
        },
        {
            "id": 155,
            "name": "Amoxicillin 100mg",
            "type": "Medicine",
            "price": "\u20b9160.74",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-01-19",
            "stock": 95
        },
        {
            "id": 156,
            "name": "Paracetamol 250mg",
            "type": "Medicine",
            "price": "\u20b9358.76",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-01-13",
            "stock": 13
        },
        {
            "id": 157,
            "name": "Paracetamol 250mg",
            "type": "Medicine",
            "price": "\u20b9443.72",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-12-30",
            "stock": 22
        },
        {
            "id": 158,
            "name": "Cetirizine 100mg",
            "type": "Medicine",
            "price": "\u20b9411.24",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-08-08",
            "stock": 111
        },
        {
            "id": 159,
            "name": "Amoxicillin 650mg",
            "type": "Medicine",
            "price": "\u20b9125.09",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-03-02",
            "stock": 26
        },
        {
            "id": 160,
            "name": "Ranitidine 650mg",
            "type": "Medicine",
            "price": "\u20b9486.81",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-07-13",
            "stock": 18
        },
        {
            "id": 161,
            "name": "Cetirizine 5mg",
            "type": "Medicine",
            "price": "\u20b9353.78",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2028-12-02",
            "stock": 130
        },
        {
            "id": 162,
            "name": "Losartan 10mg",
            "type": "Medicine",
            "price": "\u20b9374.57",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-05-17",
            "stock": 67
        },
        {
            "id": 163,
            "name": "Losartan 250mg",
            "type": "Medicine",
            "price": "\u20b9390.17",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-10-02",
            "stock": 31
        },
        {
            "id": 164,
            "name": "Aspirin 100mg",
            "type": "Medicine",
            "price": "\u20b9491.54",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-01-10",
            "stock": 101
        },
        {
            "id": 165,
            "name": "Ibuprofen 10mg",
            "type": "Medicine",
            "price": "\u20b9117.52",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-06-17",
            "stock": 150
        },
        {
            "id": 166,
            "name": "Azithromycin 10mg",
            "type": "Medicine",
            "price": "\u20b9406.51",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-03-15",
            "stock": 93
        },
        {
            "id": 167,
            "name": "Aspirin 5mg",
            "type": "Medicine",
            "price": "\u20b9236.59",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-03-02",
            "stock": 54
        },
        {
            "id": 168,
            "name": "Paracetamol 250mg",
            "type": "Medicine",
            "price": "\u20b929.12",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-09-27",
            "stock": 145
        },
        {
            "id": 169,
            "name": "Clopidogrel 10mg",
            "type": "Medicine",
            "price": "\u20b9363.53",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-04-18",
            "stock": 16
        },
        {
            "id": 170,
            "name": "Hydroxyzine 10mg",
            "type": "Medicine",
            "price": "\u20b9384.68",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-10-27",
            "stock": 19
        },
        {
            "id": 171,
            "name": "Ciprofloxacin 250mg",
            "type": "Medicine",
            "price": "\u20b969.46",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2030-02-17",
            "stock": 138
        },
        {
            "id": 172,
            "name": "Clopidogrel 650mg",
            "type": "Medicine",
            "price": "\u20b9235.14",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-05-18",
            "stock": 184
        },
        {
            "id": 173,
            "name": "Ciprofloxacin 250mg",
            "type": "Medicine",
            "price": "\u20b9272.46",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-09-10",
            "stock": 95
        },
        {
            "id": 174,
            "name": "Ranitidine 5mg",
            "type": "Medicine",
            "price": "\u20b9133.13",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2030-02-25",
            "stock": 49
        },
        {
            "id": 175,
            "name": "Pantoprazole 250mg",
            "type": "Medicine",
            "price": "\u20b9419.64",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-05-26",
            "stock": 170
        },
        {
            "id": 176,
            "name": "Pantoprazole 100mg",
            "type": "Medicine",
            "price": "\u20b9468.79",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-08-15",
            "stock": 33
        },
        {
            "id": 177,
            "name": "Amlodipine 650mg",
            "type": "Medicine",
            "price": "\u20b959.93",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-07-07",
            "stock": 54
        },
        {
            "id": 178,
            "name": "Metformin 100mg",
            "type": "Medicine",
            "price": "\u20b9182.26",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-04-11",
            "stock": 125
        },
        {
            "id": 179,
            "name": "Losartan 100mg",
            "type": "Medicine",
            "price": "\u20b9239.53",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-01-18",
            "stock": 160
        },
        {
            "id": 180,
            "name": "Clopidogrel 5mg",
            "type": "Medicine",
            "price": "\u20b969.18",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-08-10",
            "stock": 27
        },
        {
            "id": 181,
            "name": "Levocetirizine 650mg",
            "type": "Medicine",
            "price": "\u20b995.55",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-04-21",
            "stock": 134
        },
        {
            "id": 182,
            "name": "Aspirin 250mg",
            "type": "Medicine",
            "price": "\u20b9428.06",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-01-19",
            "stock": 110
        },
        {
            "id": 183,
            "name": "Diclofenac 5mg",
            "type": "Medicine",
            "price": "\u20b9351.75",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-01-29",
            "stock": 161
        },
        {
            "id": 184,
            "name": "Amlodipine 650mg",
            "type": "Medicine",
            "price": "\u20b9304.93",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-03-05",
            "stock": 53
        },
        {
            "id": 185,
            "name": "Ciprofloxacin 250mg",
            "type": "Medicine",
            "price": "\u20b9370.51",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-07-25",
            "stock": 70
        },
        {
            "id": 186,
            "name": "Omeprazole 250mg",
            "type": "Medicine",
            "price": "\u20b973.74",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-08-20",
            "stock": 68
        },
        {
            "id": 187,
            "name": "Metformin 5mg",
            "type": "Medicine",
            "price": "\u20b978.11",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-09-07",
            "stock": 38
        },
        {
            "id": 188,
            "name": "Paracetamol 250mg",
            "type": "Medicine",
            "price": "\u20b9267.52",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2029-04-18",
            "stock": 178
        },
        {
            "id": 189,
            "name": "Cetirizine 500mg",
            "type": "Medicine",
            "price": "\u20b973.32",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-02-02",
            "stock": 87
        },
        {
            "id": 190,
            "name": "Amoxicillin 250mg",
            "type": "Medicine",
            "price": "\u20b9233.91",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-04-26",
            "stock": 149
        },
        {
            "id": 191,
            "name": "Dolo 10mg",
            "type": "Medicine",
            "price": "\u20b9487.36",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2030-03-30",
            "stock": 196
        },
        {
            "id": 192,
            "name": "Atorvastatin 100mg",
            "type": "Medicine",
            "price": "\u20b9452.56",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-12-21",
            "stock": 120
        },
        {
            "id": 193,
            "name": "Cetirizine 100mg",
            "type": "Medicine",
            "price": "\u20b9423.55",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-06-24",
            "stock": 160
        },
        {
            "id": 194,
            "name": "Ranitidine 5mg",
            "type": "Medicine",
            "price": "\u20b9426.06",
            "icon": "fa-pills",
            "rx": true,
            "expiry": "2027-10-13",
            "stock": 10
        },
        {
            "id": 195,
            "name": "Ibuprofen 10mg",
            "type": "Medicine",
            "price": "\u20b9282.33",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2028-12-10",
            "stock": 11
        },
        {
            "id": 196,
            "name": "Pantoprazole 10mg",
            "type": "Medicine",
            "price": "\u20b9445.12",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-05-02",
            "stock": 116
        },
        {
            "id": 197,
            "name": "Clopidogrel 650mg",
            "type": "Medicine",
            "price": "\u20b9351.03",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2029-02-13",
            "stock": 10
        },
        {
            "id": 198,
            "name": "Amoxicillin 500mg",
            "type": "Medicine",
            "price": "\u20b9285.16",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-08-01",
            "stock": 68
        },
        {
            "id": 199,
            "name": "Diclofenac 250mg",
            "type": "Medicine",
            "price": "\u20b9370.32",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-11-07",
            "stock": 59
        },
        {
            "id": 200,
            "name": "Levocetirizine 250mg",
            "type": "Medicine",
            "price": "\u20b9376.46",
            "icon": "fa-pills",
            "rx": false,
            "expiry": "2027-04-10",
            "stock": 49
        }

    ];

    let savedMedicines = JSON.parse(localStorage.getItem('amedpro_medicines'));
    let medicinesDb = savedMedicines && savedMedicines.length > 50 ? savedMedicines : dummyMedicinesBackup;
    let rxRequestsDb = JSON.parse(localStorage.getItem('amedpro_requests')) || [];

    // Auto-Removal Check On Load
    function autoPruneExpiredMeds() {
        const todayStr = fmt(now);
        const initialCount = medicinesDb.length;
        medicinesDb = medicinesDb.filter(med => med.expiry >= todayStr && med.stock > 0);

        if (medicinesDb.length < initialCount) {
            saveMedicines();
            // In a real app, this would use a notification system. Over here we just log and maybe alert later if pharmacist logs in.
            console.warn("Expired or empty stock medicines were automatically removed.");
            localStorage.setItem('amedpro_notif', 'System auto-removed expired or 0-stock medications.');
        }
    }
    autoPruneExpiredMeds();

    function saveMedicines() {
        localStorage.setItem('amedpro_medicines', JSON.stringify(medicinesDb));
    }

    function saveRequests() {
        localStorage.setItem('amedpro_requests', JSON.stringify(rxRequestsDb));
    }

    // --- IndexedDB Authentication Setup ---
    const dbName = "aMedProDB";
    let db;
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
        console.error("Database error: ", event.target.error);
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        // Create an objectStore for this database
        const objectStore = db.createObjectStore("users", { keyPath: "username" });
        objectStore.createIndex("role", "role", { unique: false });
    };

    request.onsuccess = (event) => {
        db = event.target.result;
    };

    // Auth Elements
    const loginContainer = document.getElementById('login-container');
    const mainChatContainer = document.getElementById('chat-container');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const roleSelect = document.getElementById('role-select');
    const loginBtn = document.getElementById('login-btn');
    const signupToggleBtn = document.getElementById('signup-toggle-btn');
    const signupSubmitBtn = document.getElementById('signup-submit-btn');
    const loginToggleBtn = document.getElementById('login-toggle-btn');
    const authMessage = document.getElementById('auth-message');

    // New Fields
    const fullNameInput = document.getElementById('full-name');
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const signupOnlyFields = document.querySelectorAll('.signup-only');

    function showAuthMessage(msg, isError = false) {
        authMessage.textContent = msg;
        authMessage.style.color = isError ? '#D32F2F' : '#2E7D32';
    }

    // Toggle between Login and Signup
    signupToggleBtn.addEventListener('click', () => {
        signupOnlyFields.forEach(f => f.style.display = 'block');
        signupSubmitBtn.style.display = 'block';
        loginToggleBtn.style.display = 'block';
        loginBtn.style.display = 'none';
        signupToggleBtn.style.display = 'none';
        document.getElementById('role-group').style.display = 'none'; // Only "User" role can sign up
        roleSelect.value = 'user';
        authMessage.textContent = '';
    });

    loginToggleBtn.addEventListener('click', () => {
        signupOnlyFields.forEach(f => f.style.display = 'none');
        signupSubmitBtn.style.display = 'none';
        loginToggleBtn.style.display = 'none';
        loginBtn.style.display = 'block';
        signupToggleBtn.style.display = 'block';
        document.getElementById('role-group').style.display = 'block';
        authMessage.textContent = '';
    });

    signupSubmitBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim(); // This will be the email/username
        const password = passwordInput.value.trim();
        const fullName = fullNameInput.value.trim();
        const age = ageInput.value.trim();
        const gender = genderSelect.value;
        const role = 'user'; // Hardcoded for signup

        if (!username || !password || !fullName || !age || !gender) {
            showAuthMessage('Please fill in all fields', true);
            return;
        }

        const transaction = db.transaction(["users"], "readwrite");
        const objectStore = transaction.objectStore("users");

        const request = objectStore.get(username);
        request.onsuccess = (event) => {
            if (request.result) {
                showAuthMessage('User already exists', true);
            } else {
                objectStore.add({
                    username,
                    password,
                    role,
                    fullName,
                    age,
                    gender,
                    isApproved: true,
                    registrationDate: new Date().toISOString()
                });
                showAuthMessage('Sign up successful! You can now login.');
                loginToggleBtn.click(); // Switch back to login
            }
        };
    });

    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const role = roleSelect.value;

        if (!username || !password) {
            showAuthMessage('Please enter email and password', true);
            return;
        }

        // --- HARDCODED ADMIN CHECK ---
        if (username === 'admin@test.com' && password === 'test1234') {
            const adminUser = { username: 'admin@test.com', fullName: 'System Admin', role: 'admin' };
            performLogin(adminUser);
            return;
        }

        const transaction = db.transaction(["users"], "readonly");
        const objectStore = transaction.objectStore("users");

        const request = objectStore.get(username);
        request.onsuccess = (event) => {
            const user = request.result;
            if (user && user.password === password) {
                if (user.role !== role) {
                    showAuthMessage(`Invalid role. Access denied for ${role}.`, true);
                    return;
                }

                // If it's a pharmacist, we should ideally check if they are approved but the prompt says 
                // "Adding roll of pharmacist through admin dashboard" so we assume if they are in DB with role 'pharmacist' 
                // it's intentional.

                performLogin(user);
            } else {
                showAuthMessage('Invalid username or password', true);
            }
        };
    });

    function performLogin(user) {
        showAuthMessage('Login successful!');
        currentUser = user;

        setTimeout(() => {
            loginContainer.style.display = 'none';
            mainChatContainer.style.display = 'flex';

            const headerTitle = document.getElementById('header-title');
            const headerIcon = document.querySelector('.chat-header .avatar i');
            const userIdDisplay = document.getElementById('user-id-display');

            // Reset all navs
            document.getElementById('tabs-nav').style.display = 'none';
            document.getElementById('pharmacist-tabs-nav').style.display = 'none';
            document.getElementById('admin-tabs-nav').style.display = 'none';

            // Set User ID/Name Display
            userIdDisplay.textContent = user.fullName ? `User: ${user.fullName}` : `ID: ${user.username.split('@')[0]}`;

            if (user.role === 'pharmacist') {
                headerTitle.textContent = 'Pharmacist Dashboard';
                headerIcon.className = 'fa-solid fa-user-doctor';
                document.getElementById('pharmacist-tabs-nav').style.display = 'flex';
                if (typeof renderPharmacistData === 'function') renderPharmacistData();
                switchTab('tab-pharm-requests', 'pharmacist-tabs-nav');
            } else if (user.role === 'admin') {
                headerTitle.textContent = 'Admin Management Portal';
                headerIcon.className = 'fa-solid fa-user-shield';
                document.getElementById('admin-tabs-nav').style.display = 'flex';
                renderAdminData();
                switchTab('tab-admin-users', 'admin-tabs-nav');
            } else {
                headerTitle.textContent = 'aMedPro Patient Portal';
                headerIcon.className = 'fa-solid fa-bed-pulse';
                document.getElementById('tabs-nav').style.display = 'flex';
                renderDashboardData();
                switchTab('tab-chat', 'tabs-nav');
            }

            renderNotifications();
            document.getElementById('chat-input').focus();

        }, 500);
    }

    function switchTab(tabId, navId) {
        const nav = document.getElementById(navId);
        const btns = nav.querySelectorAll('.nav-btn');
        const contents = document.querySelectorAll('.tab-content');

        btns.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active-tab'));

        const targetBtn = nav.querySelector(`[data-target="${tabId}"]`);
        if (targetBtn) targetBtn.classList.add('active');
        document.getElementById(tabId).classList.add('active-tab');
    }

    // --- Logout Logic ---
    document.getElementById('logout-btn').addEventListener('click', () => {
        mainChatContainer.style.display = 'none';
        loginContainer.style.display = 'flex';
        // Reset tabs to chat
        const tabsNavButtons = document.querySelectorAll('.nav-btn');
        tabsNavButtons.forEach(b => b.classList.remove('active'));
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(tc => tc.classList.remove('active-tab'));
        if (tabsNavButtons.length > 0) {
            tabsNavButtons[0].classList.add('active');
            document.getElementById('tab-chat').classList.add('active-tab');
        }
        currentUser = null;

        // Reset inputs & hide navs
        document.getElementById('tabs-nav').style.display = 'none';
        document.getElementById('pharmacist-tabs-nav').style.display = 'none';
        usernameInput.value = '';
        passwordInput.value = '';
        authMessage.textContent = '';
    });

    // --- Chat Logic ---
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatWindow = document.getElementById('chat-window');
    const loadingIndicator = document.getElementById('loading-indicator');
    const sendBtn = document.getElementById('send-btn');
    const micBtn = document.getElementById('mic-btn');
    let lastInputWasVoice = false;


    // The FastAPI backend URL
    const API_URL = 'http://127.0.0.1:8000/chat';

    // Toggle send button state based on input
    chatInput.addEventListener('input', () => {
        sendBtn.disabled = chatInput.value.trim() === '';
    });
    // Init state
    sendBtn.disabled = chatInput.value.trim() === '';

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const messageText = chatInput.value.trim();
        if (!messageText) return;

        // 1. Add user message to UI
        appendMessage(messageText, 'user');

        // Clear input and disable button
        chatInput.value = '';
        sendBtn.disabled = true;

        const isVoice = lastInputWasVoice;
        lastInputWasVoice = false; // Reset for next turn


        // 2. Show loading indicator
        showLoading(true);

        try {
            // 3. Send to backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: messageText })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // 4. Hide loading and show AI response
            showLoading(false);

            let formattedResponse = data.response;

            // --- REAL-WORLD ACTION (Tool Use Detection) ---
            // If the AI executed a tool, let's log it in the notification tab
            if (formattedResponse.includes('SUCCESS: Action Executed')) {
                const actionDetail = formattedResponse.match(/SUCCESS: Action Executed\.(.*?)\./);
                addNotification({
                    type: 'stock_update',
                    title: 'Real-world Action Executed',
                    message: actionDetail ? actionDetail[0] : 'Database update and webhook triggered by AI Agent.'
                });
            }

            // --- AI ORDER TRIGGER LOGIC ---
            // Marker format: ||ORDER_DATA|Name|Price|Qty|NeedsRxBoolean||
            if (formattedResponse.includes('||ORDER_DATA|')) {
                const orderPart = formattedResponse.match(/\|\|ORDER_DATA\|(.*?)\|\|/);
                if (orderPart && orderPart[1]) {
                    const parts = orderPart[1].split('|');
                    if (parts.length >= 4) {
                        const medName = parts[0];
                        const medPrice = parts[1];
                        const medQty = parseInt(parts[2]) || 1;
                        const needsRx = parts[3] === 'true';

                        // Try to find full med object in DB
                        const dbMed = medicinesDb.find(m => m.name.toLowerCase().includes(medName.toLowerCase()));
                        const medToOrder = dbMed || {
                            name: medName,
                            price: medPrice,
                            rx: needsRx,
                            id: Date.now(),
                            icon: 'fa-pills',
                            type: 'Medicine'
                        };

                        console.log("Triggering ordering phase for:", medToOrder.name, "Quantity:", medQty);

                        setTimeout(() => {
                            triggerOrderModal(medToOrder, medQty);
                        }, 1200);
                    }
                }
            }

            // Clean technical markers from visible text
            let cleanResponse = formattedResponse.replace(/\|\|ORDER_DATA\|(.*?)\|\|/g, '').trim();

            // Highlight successful stock checks
            if (cleanResponse.includes('available')) {
                cleanResponse = cleanResponse.replace('available', '<span class="success-text">available</span>');
            }

            appendMessage(cleanResponse, 'ai', true, isVoice);

        } catch (error) {
            console.error('Error fetching from backend:', error);
            showLoading(false);
            appendMessage('Sorry, I am having trouble connecting to the server. Please try again later.', 'ai');
        }
    });

    // Helper: append a message to the chat window
    function appendMessage(text, sender, isHTML = false, shouldSpeak = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');

        if (isHTML) {
            const p = document.createElement('p');
            p.innerHTML = text; // Safe here since backend response is controlled, but be careful in prod
            contentDiv.appendChild(p);
        } else {
            const p = document.createElement('p');
            p.textContent = text;
            contentDiv.appendChild(p);
        }

        messageDiv.appendChild(contentDiv);
        chatWindow.appendChild(messageDiv);

        scrollToBottom();

        // Voice output for AI messages - ONLY IF shouldSpeak is true
        if (sender === 'ai' && shouldSpeak) {
            const plainText = text.replace(/<[^>]*>?/gm, ''); // Remove HTML tags for speaking
            speak(plainText);
        }

    }

    // Helper: Text to Speech
    let aiVoices = [];
    function loadVoices() {
        aiVoices = window.speechSynthesis.getVoices();
    }
    if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }

    function speak(text) {
        if (!window.speechSynthesis) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Try to find a nice female/assistant voice
        if (aiVoices.length === 0) loadVoices();
        const preferredVoice = aiVoices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Female') || v.name.includes('Natural') || v.name.includes('Zira')));
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }

    // Helper: control loading indicator display
    function showLoading(show) {
        loadingIndicator.style.display = show ? 'block' : 'none';
        if (show) scrollToBottom();
    }

    // Helper: auto-scroll to the bottom of the chat
    function scrollToBottom() {
        // Use setTimeout to ensure DOM is updated before scrolling
        setTimeout(() => {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 10);
    }

    // Speech to Text initialization
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            sendBtn.disabled = false;

            // Mark as voice input
            lastInputWasVoice = true;

            // Auto submit
            chatForm.dispatchEvent(new Event('submit'));

            // Stop recording visual
            isRecording = false;
            micBtn.classList.remove('active');
            chatInput.placeholder = "Type your message...";
        };


        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            isRecording = false;
            micBtn.classList.remove('active');
            chatInput.placeholder = "Type your message...";
        };

        recognition.onend = () => {
            if (isRecording) {
                isRecording = false;
                micBtn.classList.remove('active');
                chatInput.placeholder = "Type your message...";
            }
        };
    }

    // Mic button listener
    let isRecording = false;
    micBtn.addEventListener('click', () => {
        if (!recognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        isRecording = !isRecording;
        if (isRecording) {
            try {
                recognition.start();
                micBtn.classList.add('active');
                chatInput.placeholder = "Listening...";
                // Stop any TTS
                window.speechSynthesis.cancel();
            } catch (err) {
                console.error('Recognition start error:', err);
                isRecording = false;
            }
        } else {
            recognition.stop();
            micBtn.classList.remove('active');
            chatInput.placeholder = "Type your message...";
        }
    });

    // --- Dashboard Specific Logic (User Role) ---
    const tabsNavButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabsNavButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabsNavButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active-tab'));

            // Add active class to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-tab');
        });
    });

    // Chat suggestions click
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const text = chip.getAttribute('data-text');
            chatInput.value = text;
            sendBtn.disabled = false;
            chatForm.dispatchEvent(new Event('submit'));
        });
    });

    // Notification Button Event
    const notifBtn = document.getElementById('notif-btn');
    notifBtn.addEventListener('click', () => {
        // Find which nav is active
        let activeNav = 'tabs-nav';
        if (currentUser && currentUser.role === 'pharmacist') activeNav = 'pharmacist-tabs-nav';
        if (currentUser && currentUser.role === 'admin') activeNav = 'admin-tabs-nav';

        switchTab('tab-notifications', activeNav);
        // Clear badge
        document.getElementById('notif-badge').style.display = 'none';
        renderNotifications();
    });

    function addNotification(notif) {
        notifications.unshift({
            ...notif,
            id: Date.now(),
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        });

        // Persist to localStorage
        localStorage.setItem('amedpro_notifications', JSON.stringify(notifications));

        // Update badge
        const badge = document.getElementById('notif-badge');
        badge.style.display = 'block';

        // Re-render if tab is active
        if (document.getElementById('tab-notifications').classList.contains('active-tab')) {
            renderNotifications();
        }
    }


    function renderNotifications() {
        const list = document.getElementById('notifications-list');
        const title = document.getElementById('notif-tab-title');
        if (!list || !currentUser) return;

        list.innerHTML = '';

        // Filter based on role
        let filtered = [];
        if (currentUser.role === 'user') {
            // Users only see their own order confirmations
            const userLower = currentUser.username.toLowerCase();
            filtered = notifications.filter(n => n.type === 'order_confirm' && n.username && n.username.toLowerCase() === userLower);
            title.textContent = "My Order Confirmations";
        } else {
            // Pharmacists and Admins see BOTH order logs and stock updates
            filtered = notifications.filter(n => n.type === 'order_confirm' || n.type === 'stock_update');
            title.textContent = "System Logs & Notifications";
        }

        if (filtered.length === 0) {
            list.innerHTML = `<p style="color: var(--text-muted); font-size: 14px; padding: 10px;">No new system logs for ${currentUser.role}.</p>`;
            return;
        }

        filtered.forEach(n => {
            const item = document.createElement('div');
            item.className = `notif-item ${n.type === 'stock_update' ? 'stock-update' : ''}`;

            // Highlight tool-use actions
            const isToolAction = n.message && n.message.includes('Action Executed');
            if (isToolAction) item.style.borderLeftColor = '#4CAF50';

            item.innerHTML = `
                <h4>
                    <span><i class="fa-solid ${n.type === 'stock_update' ? 'fa-gears' : 'fa-receipt'}" style="margin-right: 8px;"></i> ${n.title}</span>
                    <span class="notif-time">${n.time}</span>
                </h4>
                <p>${n.message}</p>
                ${n.stockInfo ? `<p style="font-size: 12px; font-weight: 600; color: ${n.stockInfo.qty < 10 ? '#D32F2F' : 'var(--primary-blue)'}">Stock remaining: ${n.stockInfo.qty}</p>` : ''}
            `;
            list.appendChild(item);
        });
    }


    // Dummy Data
    const dummyMedicines = [
        { id: 1, name: "Paracetamol 500mg", type: "Fever/Pain", price: "₹50.00", icon: "fa-pills", rx: false },
        { id: 2, name: "Amoxicillin 250mg", type: "Antibiotic", price: "₹120.00", icon: "fa-capsules", rx: true },
        { id: 3, name: "Lisinopril 10mg", type: "Blood Pressure", price: "₹185.50", icon: "fa-tablets", rx: true },
        { id: 4, name: "Ibuprofen 400mg", type: "Pain Relief", price: "₹72.25", icon: "fa-pills", rx: false },
        { id: 5, name: "Cough Syrup 100ml", type: "Cold/Cough", price: "₹85.50", icon: "fa-bottle-droplet", rx: false },
        { id: 6, name: "Vitamin C 1000mg", type: "Supplement", price: "₹150.00", icon: "fa-tablets", rx: false }
    ];

    // Dummy static data not managed by pharmacist simulation
    let purchaseHistory = [
        { id: 101, name: "Lisinopril 10mg", dosage: "1x Daily", date: "2026-01-15 10:30 AM", refillDate: "2026-02-28", price: "₹185.50" },
        { id: 102, name: "Vitamin C 1000mg", dosage: "1x Daily", date: "2026-02-01 14:15 PM", refillDate: "2026-03-15", price: "₹150.00" }
    ];

    const dummyRefills = [
        { name: "Lisinopril 10mg", msg: "Your BP tablets are ending in 2 days. Do you want to refill them?" },
        { name: "Insulin Glargine", msg: "Your prescription expires in 5 days." }
    ];

    let pendingPaymentMed = null;
    const paymentModal = document.getElementById('payment-modal');

    // --- User Dashboard Rendering ---
    window.renderDashboardData = function () {
        renderMedicines();
        renderHistory();
        renderRefills();
        renderUserRequests();
        generateChatSuggestions();
    };

    function renderUserRequests() {
        const list = document.getElementById('user-requests-list');
        list.innerHTML = '';
        if (!currentUser) return;

        const myRequests = rxRequestsDb.filter(r => r.username === currentUser.username);

        if (myRequests.length === 0) {
            list.innerHTML = '<p style="color: var(--text-muted); font-size: 14px;">No prescription requests yet.</p>';
            return;
        }

        myRequests.forEach(req => {
            const item = document.createElement('div');
            item.className = 'request-item';
            let badgeClass = req.status === 'Pending' ? 'badge-pending' : (req.status === 'Approved' ? 'badge-approved' : 'badge-rejected');

            item.innerHTML = `
                <div>
                    <h4 style="font-size: 15px; margin-bottom: 4px;">${req.medName}</h4>
                    <p style="font-size: 12px; color: var(--text-muted);"><i class="fa-regular fa-clock"></i> ${req.date}</p>
                </div>
                <div>
                    <span class="status-badge ${badgeClass}">${req.status}</span>
                </div>
            `;
            list.appendChild(item);
        });
    }

    function triggerOrderModal(med) {
        pendingPaymentMed = med;
        document.getElementById('payment-med-name').textContent = med.name;
        document.getElementById('payment-med-price').textContent = med.price;

        const rxSection = document.getElementById('prescription-section');
        if (med.rx) {
            rxSection.style.display = 'block';
            document.getElementById('confirm-payment').innerHTML = '<i class="fa-solid fa-upload"></i> Submit Rx Request';
        } else {
            rxSection.style.display = 'none';
            document.getElementById('confirm-payment').innerHTML = 'Pay Now';
        }

        paymentModal.style.display = 'flex';
    }

    function generateChatSuggestions() {
        const suggestionsContainer = document.getElementById('chat-suggestions');
        suggestionsContainer.innerHTML = '';

        // Pick top 3 meds to show as quick orders
        const topMeds = medicinesDb.slice(0, 3);
        topMeds.forEach(med => {
            const chip = document.createElement('span');
            chip.className = 'suggestion-chip';
            chip.textContent = `Order ${med.name}`;
            chip.addEventListener('click', () => {
                appendMessage(`I want to order ${med.name}`, 'user');
                showLoading(true);

                setTimeout(() => {
                    showLoading(false);
                    // Bot response providing an easy UI entry point in chat
                    const replyUi = `
                        I found <strong>${med.name}</strong> (${med.price}) in our store. 
                        <br><br>
                        <button class="order-btn" style="width: auto; padding: 6px 16px;" onclick='window.attemptOrder(${JSON.stringify(med)})'>
                            Proceed to Order
                        </button>
                    `;
                    appendMessage(replyUi, 'ai', true);
                }, 800);
            });
            suggestionsContainer.appendChild(chip);
        });

        // Global hook for inline chat button
        window.attemptOrder = function (medObj) {
            triggerOrderModal(medObj);
        };
    }

    function getSortedMedicinesForUsers() {
        // Highest Stock at Top (DESC)
        return [...medicinesDb].sort((a, b) => b.stock - a.stock);
    }

    function getSortedMedicinesForStaff() {
        // Lowest Stock at Top (ASC) - for refill priority
        return [...medicinesDb].sort((a, b) => a.stock - b.stock);
    }

    function renderMedicines() {
        const grid = document.getElementById('medicines-grid');
        grid.innerHTML = '';
        const sortedForUsers = getSortedMedicinesForUsers();

        sortedForUsers.forEach(med => {
            const card = document.createElement('div');
            card.className = 'med-card';
            card.innerHTML = `
                ${med.rx ? '<span class="rx-badge">Rx Needed</span>' : ''}
                <div class="med-icon"><i class="fa-solid ${med.icon || 'fa-pills'}"></i></div>
                <div class="med-info">
                    <h3>${med.name}</h3>
                    <p>${med.type}</p>
                    <p style="font-size: 11px; margin-top:2px; color: ${med.stock < 10 ? '#D32F2F' : 'var(--text-muted)'};">Stock: ${med.stock}</p>
                </div>
                <div class="med-price">${med.price}</div>
                <button class="order-btn" data-json='${JSON.stringify(med)}'>Order</button>
            `;
            grid.appendChild(card);
        });

        // Add order button events
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const med = JSON.parse(e.target.getAttribute('data-json'));
                triggerOrderModal(med);
            });
        });
    }

    function renderHistory() {
        const list = document.getElementById('history-list');
        list.innerHTML = '';
        purchaseHistory.forEach(hist => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-details">
                    <p><strong>${hist.name}</strong> (${hist.price})</p>
                    <p>Dosage: ${hist.dosage}</p>
                    <div class="history-meta"><i class="fa-regular fa-clock"></i> Ordered: ${hist.date} | Refill by: ${hist.refillDate}</div>
                </div>
            `;
            list.appendChild(item);
        });
    }

    function renderRefills() {
        const list = document.getElementById('refills-list');
        list.innerHTML = '';
        dummyRefills.forEach(refill => {
            const item = document.createElement('div');
            item.className = 'refill-item';
            item.innerHTML = `
                <div class="refill-details">
                    <p><strong>${refill.name}</strong></p>
                    <p class="refill-alert">${refill.msg}</p>
                </div>
                <button class="refill-btn">Refill Now</button>
            `;
            list.appendChild(item);
        });
    }

    // Payment Logic
    document.getElementById('cancel-payment').addEventListener('click', () => {
        paymentModal.style.display = 'none';
        pendingPaymentMed = null;
    });

    document.getElementById('confirm-payment').addEventListener('click', () => {
        if (pendingPaymentMed) {
            // Check prescription if needed
            if (pendingPaymentMed.rx) {
                const fileInput = document.getElementById('prescription-file');
                if (!fileInput.files.length) {
                    alert("Please upload a prescription before proceeding.");
                    return;
                }

                // Submit Request instead of direct history logic
                const newReq = {
                    id: Date.now(),
                    username: currentUser.username,
                    medName: pendingPaymentMed.name,
                    status: 'Pending',
                    date: new Date().toLocaleString()
                };

                rxRequestsDb.unshift(newReq);
                saveRequests();
                renderUserRequests();

                document.querySelector('[data-target="tab-refills"]').click();
                paymentModal.style.display = 'none';
                pendingPaymentMed = null;
                document.getElementById('prescription-file').value = "";
                appendMessage(`Prescription submitted for ${newReq.medName}. Awaiting pharmacist review.`, 'ai');
                return;
            }

            // If Rx approved/submitted, or No-Rx standard logic:
            const orderQty = parseInt(document.getElementById('order-quantity').value) || 1;

            // Deduct Stock
            const dbMedIndex = medicinesDb.findIndex(m => m.id === pendingPaymentMed.id);
            if (dbMedIndex >= 0) {
                if (medicinesDb[dbMedIndex].stock < orderQty) {
                    alert("Insufficient stock for this quantity!");
                    return;
                }
                medicinesDb[dbMedIndex].stock -= orderQty;
                saveMedicines(); // global save

                // If stock hits 0 post-purchase, prune it immediately
                if (medicinesDb[dbMedIndex].stock <= 0) {
                    medicinesDb.splice(dbMedIndex, 1);
                    saveMedicines();
                }
            }

            // Direct Payment logic
            const now = new Date();
            const future = new Date();
            future.setMonth(now.getMonth() + 1);

            // Calculate total price
            const unitPriceNum = parseFloat(pendingPaymentMed.price.replace(/[^\d.]/g, '')) || 0;
            const totalPriceStr = "₹" + (unitPriceNum * orderQty).toFixed(2);

            const newHistory = {
                id: Date.now(),
                name: pendingPaymentMed.name,
                dosage: `${orderQty} units`,
                date: now.toLocaleString(),
                refillDate: future.toISOString().split('T')[0],
                price: totalPriceStr
            };

            purchaseHistory.unshift(newHistory); // add to top
            renderHistory();
            renderMedicines(); // Refresh UI to show new stock sorting

            // Switch to history tab to show progress
            document.querySelector('[data-target="tab-history"]').click();

            paymentModal.style.display = 'none';
            pendingPaymentMed = null;

            // Show alert or let user know
            appendMessage(`Payment successful! Order confirmed for ${orderQty} units of ${newHistory.name}. Total Paid: ${totalPriceStr}`, 'ai');

            // --- TRIGGER NOTIFICATIONS ---
            // 1. For User
            addNotification({
                type: 'order_confirm',
                username: currentUser.username,
                title: 'Order Confirmed!',
                message: `Successfully ordered ${orderQty} units of ${newHistory.name}. Total: ${totalPriceStr}`
            });

            // 2. For Pharmacist & Admin (Stock update)
            const remainingStock = medicinesDb.find(m => m.name === newHistory.name)?.stock || 0;
            addNotification({
                type: 'stock_update',
                title: 'Inventory Update',
                message: `New order: ${orderQty} units of ${newHistory.name}.`,
                stockInfo: {
                    medName: newHistory.name,
                    qty: remainingStock
                }
            });

            // 3. TRIGGER REAL EMAIL
            if (currentUser.username.includes('@') && !currentUser.username.endsWith('test.com')) {
                console.log("Attempting to send real email to:", currentUser.username);
                fetch('http://127.0.0.1:8000/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to_email: currentUser.username,
                        subject: "aMedPro: Order Confirmation",
                        message: `Hello ${currentUser.fullName || 'User'},\n\nYour order for ${newHistory.name} (${newHistory.price}) has been confirmed successfully.\nOrder ID: #${newHistory.id}\n\nThank you for choosing aMedPro!`
                    })
                }).catch(err => console.error("Email API failed:", err));
            }
        }
    });



    // --- Pharmacist Dashboard Features ---
    window.renderPharmacistData = function () {
        renderPharmRequests();
        renderPharmStock();
        renderPharmManage();
    };

    function renderPharmRequests() {
        const list = document.getElementById('pharm-requests-list');
        list.innerHTML = '';

        if (rxRequestsDb.length === 0) {
            list.innerHTML = '<p style="color: var(--text-muted); font-size: 14px;">No Rx requests available.</p>';
            return;
        }

        rxRequestsDb.forEach(req => {
            const item = document.createElement('div');
            item.className = 'request-item';

            let statusHtml = '';
            if (req.status === 'Pending') {
                statusHtml = `
                    <div class="request-actions">
                        <button class="action-btn approve-btn" onclick="updateReqStatus(${req.id}, 'Approved')"><i class="fa-solid fa-check"></i> Approve</button>
                        <button class="action-btn reject-btn" onclick="updateReqStatus(${req.id}, 'Rejected')"><i class="fa-solid fa-xmark"></i> Reject</button>
                    </div>
                `;
            } else {
                let badgeClass = req.status === 'Approved' ? 'badge-approved' : 'badge-rejected';
                statusHtml = `<span class="status-badge ${badgeClass}">${req.status}</span>`;
            }

            item.innerHTML = `
                <div>
                    <h4 style="font-size: 15px; margin-bottom: 4px;">User: ${req.username}</h4>
                    <p style="font-size: 14px;"><strong>Med:</strong> ${req.medName}</p>
                    <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;"><i class="fa-regular fa-clock"></i> ${req.date}</p>
                </div>
                ${statusHtml}
            `;
            list.appendChild(item);
        });
    }

    window.updateReqStatus = function (reqId, newStatus) {
        const req = rxRequestsDb.find(r => r.id === reqId);
        if (req) {
            req.status = newStatus;
            saveRequests();
            renderPharmRequests();
        }
    };

    function getSortedMedicinesByExpiry() {
        return [...medicinesDb].sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
    }

    function renderPharmStock() {
        const grid = document.getElementById('pharm-stock-grid');
        grid.innerHTML = '';

        const sortedForPharm = getSortedMedicinesForStaff();

        sortedForPharm.forEach(med => {
            const card = document.createElement('div');
            card.className = 'med-card';
            card.innerHTML = `
                ${med.rx ? '<span class="rx-badge">Rx Needed</span>' : ''}
                <div class="med-icon"><i class="fa-solid ${med.icon || 'fa-boxes-stacked'}"></i></div>
                <div class="med-info">
                    <h3>${med.name}</h3>
                    <p>${med.type}</p>
                    <p style="font-size: 11px; margin-top:2px; color: ${med.stock < 10 ? '#D32F2F' : 'var(--text-muted)'};">Stock Qty: ${med.stock}</p>
                </div>
                <div class="med-price" style="color: #424242; font-size: 12px; font-weight: 500;">Exp: ${med.expiry}</div>
            `;
            grid.appendChild(card);
        });
    }

    function renderPharmManage() {
        const list = document.getElementById('pharm-manage-list');
        list.innerHTML = '';

        // Match pharmacist arrangement by expiry date here as well
        const sortedForPharm = getSortedMedicinesByExpiry();

        sortedForPharm.forEach(med => {
            const item = document.createElement('div');
            item.className = 'manage-item';
            item.innerHTML = `
                <div>
                    <strong style="font-size: 15px;">${med.name}</strong> - ${med.price}
                    <p style="font-size: 12px; color: var(--text-muted);">${med.type} | Stock: <b>${med.stock}</b> | Exp: <span style="color:#D32F2F">${med.expiry}</span></p>
                </div>
                <button class="remove-btn" onclick="removeMedicine(${med.id})"><i class="fa-solid fa-trash-can"></i> Remove</button>
            `;
            list.appendChild(item);
        });
    }

    window.removeMedicine = function (medId) {
        medicinesDb = medicinesDb.filter(m => m.id !== medId);
        saveMedicines();
        renderPharmacistData();
    };

    document.getElementById('add-med-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newMed = {
            id: Date.now(),
            name: document.getElementById('new-med-name').value.trim(),
            type: document.getElementById('new-med-type').value.trim(),
            price: "₹" + parseFloat(document.getElementById('new-med-price').value).toFixed(2),
            icon: "fa-pills",
            rx: document.getElementById('new-med-rx').value === 'true'
        };

        medicinesDb.push(newMed);
        saveMedicines();
        renderPharmacistData(); // Re-render pharmacist tabs

        // Reset form
        e.target.reset();
        alert(`Successfully added ${newMed.name} to pharmacy stock!`);
    });

    // Pharmacist Stock Excel Download
    document.getElementById('download-stock-btn').addEventListener('click', () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "ID,Medicine Name,Category,Price,Requires Rx,Expiry Date,Stock Quantity\n";

        const sortedForPharm = getSortedMedicinesByExpiry();
        sortedForPharm.forEach(med => {
            const record = `${med.id},"${med.name}","${med.type}","${med.price}",${med.rx ? 'Yes' : 'No'},"${med.expiry}",${med.stock}`;
            csvContent += record + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "pharmacy_stock.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Download XLS
    document.getElementById('download-history-btn').addEventListener('click', () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Order ID,Medicine Name,Dosage,Price,Order Date,Refill Date\n";

        purchaseHistory.forEach(row => {
            const record = `${row.id},"${row.name}","${row.dosage}","${row.price}","${row.date}","${row.refillDate}"`;
            csvContent += record + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "purchase_history.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // --- Admin Dashboard Logic ---
    function renderAdminData() {
        renderAdminUserManagement();
        renderAdminPharmacists();
        renderAdminAnalytics();
        renderAdminInventory();
    }

    window.updateStock = function (medId, inputId) {
        const qty = parseInt(document.getElementById(inputId).value);
        if (isNaN(qty) || qty <= 0) {
            alert("Please enter a valid refill quantity.");
            return;
        }

        const med = medicinesDb.find(m => m.id === medId);
        if (med) {
            med.stock = (med.stock || 0) + qty;
            saveMedicines();
            renderAdminInventory();
            renderPharmStock();

            addNotification({
                type: 'stock_update',
                title: 'Inventory Refilled',
                message: `Admin manually refilled ${med.name} by ${qty} units. New Stock: ${med.stock}`
            });
            alert(`Stock updated! ${med.name} now has ${med.stock} units.`);
        }
    };

    function renderAdminInventory() {
        // 1. Render Mock Inventory Levels (Stock)
        const grid = document.getElementById('admin-inventory-grid');
        if (grid) {
            grid.innerHTML = '';
            const sortedForAdmin = getSortedMedicinesForStaff();
            sortedForAdmin.forEach(med => {
                const card = document.createElement('div');
                card.className = 'med-card';
                // Highlight if stock is low
                const isLow = med.stock < 15;
                const isRefillWarning = med.stock < 30;

                card.innerHTML = `
                    <div class="med-icon" style="background: ${isLow ? '#FFF5F5' : (isRefillWarning ? '#FFFDE7' : 'var(--soft-green)')}; color: ${isLow ? '#D32F2F' : (isRefillWarning ? '#FBC02D' : 'var(--dark-green)')};">
                        <i class="fa-solid ${isLow ? 'fa-triangle-exclamation' : 'fa-boxes-stacked'}"></i>
                    </div>
                    <div class="med-info">
                        <h4 style="font-size: 14px;">${med.name}</h4>
                        <p style="font-size: 11px; color: var(--text-muted);">${med.type}</p>
                        <p style="font-size: 11px; font-weight: 600; margin-top: 4px; color: ${isLow ? '#D32F2F' : 'inherit'}">Stock: ${med.stock} units</p>
                    </div>
                    <div style="font-size: 11px; margin-top: auto; padding-top: 8px; border-top: 1px solid #eee; display: flex; flex-direction: column; gap: 8px;">
                        <div>Price: ${med.price}</div>
                        <div style="display: flex; gap: 4px; align-items: center;">
                            <input type="number" id="refill-input-${med.id}" placeholder="Qty" style="width: 50px; padding: 4px; font-size: 11px; border: 1px solid #ddd; border-radius: 4px;">
                            <button class="refill-btn" onclick="updateStock(${med.id}, 'refill-input-${med.id}')" style="background: var(--primary-blue); font-size: 10px; padding: 4px 8px; border-radius: 4px;">Refill</button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // 2. Render Proactive Refill Alerts
        const refillList = document.getElementById('admin-refills-list');
        if (refillList) {
            refillList.innerHTML = '';

            // Combine dummy refills with some generated ones from history
            const allAlerts = [...dummyRefills];

            // Add custom generated alerts for demo
            const criticalStockProducts = medicinesDb.filter(m => m.stock < 15);
            criticalStockProducts.forEach(med => {
                allAlerts.push({
                    name: med.name,
                    msg: `CRITICAL ALERT: Stock for ${med.name} is dangerously low (${med.stock}). Immediate refill required.`,
                    type: 'inventory'
                });
            });

            // Refill category for stock < 30
            const refillNeededProducts = medicinesDb.filter(m => m.stock >= 15 && m.stock < 30);
            refillNeededProducts.forEach(med => {
                allAlerts.push({
                    name: med.name,
                    msg: `REFILL CATEGORY: Low stock for ${med.name} detected (${med.stock}). Refill recommended.`,
                    type: 'inventory'
                });
            });

            // Alerts based on history (upcoming refill dates)
            purchaseHistory.forEach(h => {
                const refillDate = new Date(h.refillDate);
                const diffDays = Math.ceil((refillDate - new Date()) / (1000 * 60 * 60 * 24));
                if (diffDays < 7 && diffDays >= 0) {
                    allAlerts.push({
                        name: h.name,
                        msg: `PATIENT ALERT: User refill for ${h.name} due in ${diffDays} days. Suggest sending reminder.`,
                        type: 'patient'
                    });
                }
            });

            if (allAlerts.length === 0) {
                refillList.innerHTML = '<p style="color: var(--text-muted); font-size: 14px;">No proactive alerts generated at this time.</p>';
            } else {
                allAlerts.forEach(alert => {
                    const item = document.createElement('div');
                    item.className = 'refill-item';
                    const isInventory = alert.type === 'inventory';
                    item.style.borderLeftColor = isInventory ? '#FF9800' : '#0A66C2';

                    item.innerHTML = `
                        <div class="refill-details">
                            <p><strong>${alert.name}</strong></p>
                            <p class="refill-alert" style="color: ${isInventory ? '#E65100' : '#1565C0'}; font-size: 12px;">${alert.msg}</p>
                        </div>
                        <button class="refill-btn" style="background: ${isInventory ? '#FF9800' : 'var(--primary-blue)'}; border-radius: 20px; font-size: 11px; padding: 6px 14px;">
                            ${isInventory ? 'Order Stock' : 'Notify User'}
                        </button>
                    `;
                    refillList.appendChild(item);
                });
            }
        }
    }

    function renderAdminUserManagement() {
        const transaction = db.transaction(["users"], "readonly");
        const objectStore = transaction.objectStore("users");
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            const allUsers = event.target.result || [];
            const list = document.getElementById('admin-users-list');
            if (list) {
                list.innerHTML = '';
                const searchTerm = document.getElementById('admin-user-search')?.value.toLowerCase() || '';
                const filtered = allUsers.filter(u =>
                    u.username.toLowerCase().includes(searchTerm) ||
                    (u.fullName && u.fullName.toLowerCase().includes(searchTerm))
                );

                filtered.forEach(user => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td style="padding: 12px; border-bottom: 1px solid var(--border-color);">${user.fullName || 'N/A'}</td>
                        <td style="padding: 12px; border-bottom: 1px solid var(--border-color);">${user.username}</td>
                        <td style="padding: 12px; border-bottom: 1px solid var(--border-color);">${user.role}</td>
                        <td style="padding: 12px; border-bottom: 1px solid var(--border-color);">
                            <select onchange="updateUserRole('${user.username}', this.value)" style="padding: 4px; border-radius: 4px;">
                                <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                                <option value="pharmacist" ${user.role === 'pharmacist' ? 'selected' : ''}>Pharmacist</option>
                            </select>
                        </td>
                    `;
                    list.appendChild(tr);
                });
            }
        };
    }

    window.updateUserRole = function (username, newRole) {
        const transaction = db.transaction(["users"], "readwrite");
        const objectStore = transaction.objectStore("users");
        const getRequest = objectStore.get(username);

        getRequest.onsuccess = () => {
            const user = getRequest.result;
            if (user) {
                user.role = newRole;
                objectStore.put(user);
                alert(`Role updated for ${username} to ${newRole}`);
                renderAdminData();
            }
        };
    };

    function renderAdminPharmacists() {
        const transaction = db.transaction(["users"], "readonly");
        const objectStore = transaction.objectStore("users");
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            const pharmList = (event.target.result || []).filter(u => u.role === 'pharmacist');
            const container = document.getElementById('admin-pharmacist-list');
            if (container) {
                container.innerHTML = '';
                if (pharmList.length === 0) {
                    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No pharmacists allocated yet.</p>';
                    return;
                }
                pharmList.forEach(ph => {
                    const card = document.createElement('div');
                    card.className = 'med-card';
                    card.innerHTML = `
                        <div class="med-icon" style="background: var(--light-blue); color: var(--primary-blue);">
                            <i class="fa-solid fa-user-doctor"></i>
                        </div>
                        <div class="med-info">
                            <h3>${ph.fullName || ph.username}</h3>
                            <p>${ph.username}</p>
                            <p style="font-size: 11px; margin-top: 5px;">Active Personnel</p>
                        </div>
                        <button class="order-btn" style="background: #D32F2F;" onclick="updateUserRole('${ph.username}', 'user')">Revoke License</button>
                    `;
                    container.appendChild(card);
                });
            }
        };
    }

    function renderAdminAnalytics() {
        const transaction = db.transaction(["users"], "readonly");
        const objectStore = transaction.objectStore("users");
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            const users = event.target.result || [];
            if (document.getElementById('stat-total-users')) document.getElementById('stat-total-users').textContent = users.length;
            if (document.getElementById('stat-total-pharmacists')) document.getElementById('stat-total-pharmacists').textContent = users.filter(u => u.role === 'pharmacist').length;
            if (document.getElementById('stat-total-orders')) document.getElementById('stat-total-orders').textContent = rxRequestsDb.length + purchaseHistory.length;
        };
    }

    document.getElementById('admin-user-search')?.addEventListener('input', renderAdminUserManagement);

    // Role selection change
    roleSelect.addEventListener('change', () => {
        if (roleSelect.value === 'pharmacist') {
            signupToggleBtn.style.display = 'none';
        } else {
            signupToggleBtn.style.display = 'block';
        }
    });

});
