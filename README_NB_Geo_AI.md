# NB Geo-AI: Deep Learning for Geological Contact Mapping
### New Brunswick, Canada

> **Status: Research Design & Prototype Visualisation**
> This repository contains the full research design, proposed methodology, and interactive proof-of-concept dashboard for applying deep learning to automated geological contact detection in New Brunswick. The U-Net model implementation is under active development — see the [Roadmap](#roadmap) for current progress.

---

## Overview

Geological contact mapping — identifying boundaries between different rock units — is a fundamental and labour-intensive task in bedrock geology. Traditional mapping requires extensive fieldwork; airborne geophysical surveys (magnetics, radiometrics, gravity) contain rich signals about these boundaries but are currently interpreted largely by hand.

This project proposes and designs a **U-Net convolutional neural network** approach to automate detection of lithological contacts from NRCan airborne geophysical data across New Brunswick, producing a probability map of geological boundaries that can guide targeted field revision campaigns.

**The practical outcome:** A province-scale tool that helps geological surveys prioritise where to send field geologists — reducing mapping costs and accelerating bedrock geology updates.

---

## What's in This Repository

| File / Folder | Description |
|---|---|
| `index.html` + `app.js` + `style.css` | Interactive proof-of-concept dashboard demonstrating the proposed system: current NB bedrock contacts, simulated U-Net predictions, disagreement zones flagged for field revision, and Monte Carlo Dropout uncertainty heatmap |
| `README.md` | Full research design, architecture specification, data sources, and implementation roadmap |

The **dashboard visualises the proposed analytical framework** using simulated model outputs, not trained model predictions. It serves as a communication tool to illustrate the system design and the types of outputs that would be produced. Live at: [erirera.github.io/NB-Geo-AI](https://erirera.github.io/NB-Geo-AI/)

---

## Scientific Background

Geological contacts in New Brunswick are controlled by the structural and magmatic history of the Appalachian orogen. Different lithological assemblages produce distinct geophysical signatures:

- **Airborne magnetics (TMI):** mafic and ultramafic units are highly magnetic; felsic and sedimentary units are typically weakly magnetic. Gradients mark compositional boundaries.
- **Radiometrics (K%, Th, U):** granitic rocks are enriched in K and Th; mafic volcanic rocks are depleted. Ratios are strong lithological discriminants.
- **Gravity (Bouguer anomaly):** density contrasts between dense mafic/ultramafic units and less dense felsic or sedimentary sequences.

A U-Net trained on known contact locations can learn to recognise these multi-channel geophysical signatures and predict contact probability at unmapped locations.

---

## Proposed Architecture

```
Input: Multi-channel geophysical raster stack
  └── Channels: TMI, FVD (magnetics), K%, Th, U (radiometrics), Bouguer gravity
  └── Resolution: 100m grid, NAD83 / NB Double Stereographic (EPSG:2953)

Model: Lightweight U-Net (encoder-decoder with skip connections)
  ├── Encoder: 4 downsampling blocks (Conv → BatchNorm → ReLU → MaxPool)
  ├── Bottleneck: 512-channel feature representation
  ├── Decoder: 4 upsampling blocks with skip connections from encoder
  └── Output: Per-pixel contact probability map (sigmoid activation)

Uncertainty Quantification: Monte Carlo Dropout
  └── Run inference N=50 times with dropout active
  └── Variance across runs = epistemic uncertainty heatmap
  └── High uncertainty zones → priority areas for field validation

Training Labels:
  ├── Positive: NB bedrock geological map contact lines (NB GSB), rasterised + buffered
  └── Negative: Interior of lithological polygons (away from contacts)

Validation:
  └── Hold out 20% of NB for spatial validation
  └── Report: Dice coefficient, IoU, precision/recall on contact pixels
```

---

## Dashboard Features

The interactive dashboard (prototype) demonstrates:

| Feature | Description |
|---|---|
| Current Bedrock Contacts | Visualises existing NB geological map contact lines (simulated WFS data) |
| AI Predicted Contacts | Simulates U-Net output — predicted geological boundaries |
| Revision Priority Zones | Areas of significant disagreement between existing map and model predictions |
| Uncertainty Heatmap | Monte Carlo Dropout variance — where the model is least confident |
| Performance Panel | Simulated metrics: Global Dice Score, feature importance (radiometrics > magnetics) |

---

## Data Sources

| Dataset | Source | Status |
|---|---|---|
| NB Bedrock Geology (contacts, polygons) | [NB Geological Survey](https://www2.gnb.ca/content/gnb/en/departments/erd/energy/content/minerals/content/geology_data.html) | Identified |
| Airborne Magnetics (TMI, FVD) | [NRCan Geoscience Repository](https://geoscan.nrcan.gc.ca/) | Identified |
| Airborne Radiometrics (K%, Th, U) | NRCan Airborne Geophysical Surveys | Identified |
| Gravity (Bouguer Anomaly) | NRCan Gravity Programme | Identified |

---

## Python Stack (Implementation)

```python
torch / torchvision    # U-Net implementation and training
rasterio               # Geophysical raster I/O
geopandas              # Geological contact vector data
numpy                  # Array operations
matplotlib             # Visualisation
scikit-learn           # Metrics and preprocessing
```

---

## Roadmap

- [x] Research design and architecture specification completed
- [x] Interactive dashboard (proof-of-concept visualisation)
- [x] Data sources identified and access confirmed
- [ ] Geophysical raster preprocessing pipeline
- [ ] Contact label rasterisation from NB bedrock map
- [ ] U-Net implementation (PyTorch)
- [ ] Model training and spatial validation
- [ ] Monte Carlo Dropout uncertainty quantification
- [ ] Province-scale contact prediction map
- [ ] Manuscript preparation

---

## Relevance to Mineral Exploration

Accurate, up-to-date geological contact maps are a prerequisite for exploration targeting. Lithological boundaries control the distribution of hydrothermal alteration, structural traps, and chemical gradients that localise ore deposits. Automating contact detection from geophysical data is directly relevant to reducing the cost of greenfields exploration programs in covered or poorly mapped terrain.

---

## Author

**Dele Falebita, PhD** — Exploration Geoscientist & Data Scientist  
[github.com/erirera](https://github.com/erirera) | Moncton, New Brunswick, Canada

---

*Research design completed March 2026. PyTorch implementation in progress.*  
*License: CC0-1.0*
