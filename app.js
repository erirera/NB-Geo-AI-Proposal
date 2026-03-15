document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Leaflet Map
    // Centered on New Brunswick
    const map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView([46.5653, -66.4619], 7);

    // Dark base map (using standard OSM and inverting colors in CSS)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 12,
    }).addTo(map);

    // Zoom control at top right
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // 2. Data Simulation and Layers Setup

    // A. Current Bedrock Geology (Simulated major contact lines)
    const currentGeologyLines = [
        [[47.6, -66.5], [47.2, -65.5], [46.8, -65.0], [46.2, -64.8]], // Eastern contour
        [[47.0, -68.0], [46.5, -67.2], [46.0, -66.5], [45.5, -66.0]], // Western contour
        [[46.5, -67.2], [46.4, -66.0], [45.8, -65.2]]                 // Central structure
    ];

    const currentGeologyGroup = L.layerGroup();
    currentGeologyLines.forEach(coords => {
        L.polyline(coords, {
            color: '#3b82f6',
            weight: 4,
            opacity: 0.6,
            dashArray: '5, 10'
        }).bindTooltip("Recorded Lithological Contact (WFS)", {className: 'custom-tooltip'})
          .addTo(currentGeologyGroup);
    });

    // B. AI Predicted Contacts (U-Net Output)
    // Slightly offset from current geology to show model deviation
    const aiPredictedLines = [
        [[47.65, -66.45], [47.15, -65.6], [46.75, -64.9], [46.15, -64.85]], 
        [[47.05, -67.9], [46.6, -67.1], [46.1, -66.4], [45.4, -65.9]],
        [[46.6, -67.1], [46.3, -66.1], [45.9, -65.1]] // Significant deviation here
    ];

    const aiPredictionsGroup = L.layerGroup();
    aiPredictedLines.forEach(coords => {
        L.polyline(coords, {
            color: '#00f2fe',
            weight: 3,
            opacity: 0.9,
            className: 'ai-contact' // For CSS shadows
        }).bindTooltip("Simulated U-Net Prediction<br>Conf: Mock Data", {className: 'custom-tooltip'})
          .addTo(aiPredictionsGroup);
    });

    // C. Revision Priority Zones (High disagreement)
    // Polygons where the AI strongly disagrees with the existing map
    const revisionZones = [
        [[46.6, -67.1], [46.3, -66.1], [46.4, -66.0], [46.5, -67.2]], // Polygon capturing the deviation
        [[47.2, -65.5], [47.15, -65.6], [46.75, -64.9], [46.8, -65.0]]
    ];

    const priorityGroup = L.layerGroup();
    revisionZones.forEach(coords => {
        L.polygon(coords, {
            color: '#ef4444',
            fillColor: '#ef4444',
            fillOpacity: 0.4,
            weight: 2,
            className: 'priority-zone' // CSS animation
        }).bindTooltip("<b style='color:#fca5a5;'>Proposed Priority Revision Zone</b><br>Disagreement: Mock Data", {className: 'custom-tooltip'})
          .addTo(priorityGroup);
    });

    // D. MC Dropout Uncertainty (Heatmap)
    // Generate random points around the complex central structure to simulate model uncertainty
    const uncertaintyPoints = [];
    for(let i=0; i<150; i++) {
        let lat = 46.4 + (Math.random() - 0.5) * 0.5;
        let lng = -66.6 + (Math.random() - 0.5) * 1.5;
        let intensity = Math.random();
        uncertaintyPoints.push([lat, lng, intensity]);
    }
    
    // Add additional certainty cluster near Bathurst
    for(let i=0; i<80; i++) {
        let lat = 47.4 + (Math.random() - 0.5) * 0.4;
        let lng = -66.0 + (Math.random() - 0.5) * 0.4;
        let intensity = 0.5 + Math.random() * 0.5;
        uncertaintyPoints.push([lat, lng, intensity]);
    }

    const uncertaintyHeatmap = L.heatLayer(uncertaintyPoints, {
        radius: 25,
        blur: 20,
        maxZoom: 10,
        gradient: {0.4: 'green', 0.6: 'yellow', 1.0: 'red'}
    });

    // 3. Add default layers to map
    currentGeologyGroup.addTo(map);
    aiPredictionsGroup.addTo(map);

    // 4. UI Interactions Setup
    const layerToggles = {
        'layer-geology': currentGeologyGroup,
        'layer-predictions': aiPredictionsGroup,
        'layer-priority': priorityGroup,
        'layer-uncertainty': uncertaintyHeatmap
    };

    Object.keys(layerToggles).forEach(id => {
        const toggle = document.getElementById(id);
        toggle.addEventListener('change', (e) => {
            const layer = layerToggles[id];
            if (e.target.checked) {
                map.addLayer(layer);
            } else {
                map.removeLayer(layer);
            }
        });
    });

    // Subtly animate stat updates for effect
    setTimeout(() => {
        const values = document.querySelectorAll('.stat-value');
        values.forEach(val => {
            const text = val.innerText;
            val.style.opacity = 0;
            setTimeout(() => {
                val.style.opacity = 1;
                val.style.transition = "opacity 0.5s ease-in-out";
            }, 300);
        });
    }, 1000);
});
