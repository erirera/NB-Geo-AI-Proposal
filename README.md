# NB Geo-AI: Automated Geological Contact Mapping (Proposal Mockup)

This repository contains an interactive **dashboard mockup** for the **Deep Learning Segmentation of Airborne Geophysical Data Across New Brunswick** research proposal. 

## Overview

This dashboard is a conceptual visualization designed to accompany the research proposal. It illustrates the *expected* outputs and user interface of a lightweight U-Net model applied to NRCan geophysical data a model that, once trained, aims to predict geological contacts and identify priority revision zones in New Brunswick.

**Note: The data displayed in this dashboard (AI predictions, uncertainty, and metrics) is currently simulated mock data to demonstrate the proposed functionality.**

## Proposed Features

*   **Interactive Web Map:** Built with Leaflet.js, featuring a custom dark-themed base map.
*   **Current Bedrock Geology:** Visualizes recorded lithological contacts (simulated WFS data).
*   **AI Predicted Contacts:** Displays U-Net model predictions for geological boundaries.
*   **Revision Priority Zones:** Highlights areas with significant structural disagreement between the existing geological map and the AI predictions, intended for targeted field review.
*   **Model Uncertainty:** Visualizes Monte Carlo Dropout variance as a probabilistic heatmap, showing areas of high model uncertainty.
*   **Performance Metrics:** An insights panel showcasing model statistics (e.g., Global Dice Score) and feature importance (radiometrics and magnetics).
*   **Premium Aesthetic:** Modern, glassmorphism-inspired dark mode UI.

## Technologies Used

*   **Frontend HTML/CSS:** Custom styling using `Inter` and `Outfit` fonts.
*   **JavaScript:** Vanilla JS for logic and DOM manipulation.
*   **Mapping Library:** [Leaflet.js](https://leafletjs.com/)
*   **Heatmap Plugin:** `leaflet-heat.js`

## How to Run

Because the project uses standard web technologies, you can serve it locally using any simple HTTP server.

1.  **Clone the repository.**
2.  **Navigate to the project directory.**
3.  **Start a local server:**
    *   **Python 3:** `python -m http.server 8000`
    *   **Node.js (serve):** `npx serve -l 8000`
4.  **Open in your browser:**
    Navigate to `http://localhost:8000` (or the port specified by your server).

## Project Details

This dashboard is a visualization component designed to accompany the research and development of the U-Net model for geological mapping. It allows geologists to interact with the model's outputs and prioritize areas for ground-truthing, aiming to reduce the cost and time of traditional mapping campaigns.
