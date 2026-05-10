const en = {
  common: {
    changeLanguage: "Change language",
  },

  home: {
    heading: "Our Crops",
    crops: {
      sugarcane: "Sugarcane",
      wheat: "Wheat",
      rice: "Rice",
      mustard: "Mustard",
    },
  },

  features: {
    guide: "🌾 Crop guide",
    disease: "🦠 Disease detection",
    weather: "🌦 Weather alert",
    irrigation: "💧 Irrigation reminder",
    yield: "📈 Yield prediction",
    soil: "🧪 Soil analysis",
  },

  cropDetail: {
    sections: {
      soil: "Soil Testing",
      land: "Land Preparation",
      sowing: "Sowing / Plantation",
      fertilizer: "Fertilizer Guide",
      irrigation: "Irrigation",
      weeds: "Weed Control",
      diseases: "Diseases & Solutions",
      harvest: "Harvest Time",
    },

    sugarcane: {
      soil: "Best soil pH 6.5–7.5 with good drainage.",
      land: "Deep ploughing 2–3 times and add organic manure.",
      sowing: "Plant seed sets in Feb–March.",
      fertilizer: "Apply NPK fertilizer and compost.",
      irrigation: "Irrigate every 7–10 days.",
      weeds: "Remove weeds after 30–40 days.",
      diseases: "Red rot disease – spray fungicide.",
      harvest: "Harvest after 10–12 months.",
    },

    wheat: {
      soil: "Loamy soil with pH 6–7.",
      land: "2–3 ploughing with leveling.",
      sowing: "Sow in October–November.",
      fertilizer: "Balanced NPK fertilizer.",
      irrigation: "First irrigation after 20 days.",
      weeds: "Manual or herbicide weeding.",
      diseases: "Rust disease – spray fungicide.",
      harvest: "Harvest in March–April.",
    },

    rice: {
      soil: "Clay soil that retains water.",
      land: "Prepare puddled wet field.",
      sowing: "Transplant seedlings.",
      fertilizer: "Apply nitrogen fertilizer.",
      irrigation: "Maintain standing water.",
      weeds: "Remove weeds regularly.",
      diseases: "Blast disease – pesticide spray.",
      harvest: "Harvest when grains turn yellow.",
    },

    mustard: {
      soil: "Loamy soil pH 6–7.5.",
      land: "2 ploughing with leveling.",
      sowing: "Sow in October.",
      fertilizer: "Apply balanced fertilizer.",
      irrigation: "Light irrigation after germination.",
      weeds: "Remove weeds after 20 days.",
      diseases: "Aphid attack – spray insecticide.",
      harvest: "Harvest when pods turn yellow.",
    },
  },
  diseasePage: {
    symptoms: "Symptoms",
    treatment: "Treatment"
  },
  diseases: {

    wheat: [
      {
        name: "Rust",
        symptoms: "Rust in wheat is a fungal disease that causes yellow, brown, or black powdery spots on leaves and stems, leading to reduced crop yield. It spreads quickly in cool and humid conditions.",
        treatment: "Spray fungicides like Propiconazole or Tebuconazole at 200–250 ml per acre and repeat after 10–12 days if needed. Using resistant wheat varieties and avoiding excess nitrogen fertilizer also helps prevent the disease."
      },
      {
        name: "Loose Smut",
        symptoms: "Loose Smut is a fungal disease in wheat that mainly affects the wheat ears. In infected plants, the grains are replaced by black powder-like fungal spores, which reduce grain quality and overall crop yield. The disease usually spreads through infected seeds and becomes visible when the crop starts forming ears.",
        treatment: "Loose Smut, seeds should be treated with fungicides like Carbendazim before sowing. Using disease-free certified seeds and resistant wheat varieties also helps prevent the spread of the disease."
      },
      {
        name: "Powdery Mildew",
        symptoms: "The most distinct sign is the appearance of white, flour-like fungal spots (mycelium) on the upper surface of the lower leaves. As the disease progresses, these patches spread to the upper leaves, stems, and even the heads (spikes). Over time, the white powder turns dull gray or light brown with tiny black specks. Affected leaves eventually turn yellow (chlorotic) and die prematurely, which hinders photosynthesis and leads to shriveled grains.",
        treatment: "To manage Powdery Mildew, farmers should avoid the excessive use of nitrogen fertilizers, which promotes lush, susceptible growth. Increasing plant spacing can also help by improving air circulation and reducing humidity within the crop canopy. For chemical control, spraying systemic fungicides such as Propiconazole 25% EC (TILT) or Tebuconazole is highly effective. Additionally, using sulfur-based sprays or wettable sulfur can suppress early infections. For long-term prevention, it is best to plant disease-resistant wheat varieties and practice crop rotation to break the fungal life cycle."
      },
      {
        "name": "Leaf Blight",
        "symptoms": "Leaf Blight appears as small, oval, water-soaked spots on the leaves that later turn into elongated brown lesions with yellow halos. These spots often merge, causing large areas of the leaf to dry up and look 'burnt'. It usually starts from the lower leaves and moves upwards, significantly reducing the green area needed for grain filling.",
        "treatment": "To control Leaf Blight, avoid excessive irrigation during high humidity. Use certified disease-free seeds and treat them with Carboxin or Thiram before sowing. If infection is observed in the field, spray fungicides like Mancozeb (2.5g/L) or Zineb. Maintaining proper potassium levels in the soil also helps the plant resist the infection."
      },
      {
        "name": "Karnal Bunt",
        "symptoms": "Karnal Bunt is often difficult to detect until harvest. It affects only a few grains in a wheat head, turning them into black, powdery masses of spores. A distinct fishy odor (trimethylamine) is emitted from the infected grains. Usually, the entire grain is not destroyed, but the black soot-like powder makes the wheat unfit for human consumption.",
        "treatment": "Management includes using resistant varieties and avoiding excessive irrigation during the flowering stage. Seed treatment with fungicides like Thiram or Carbendazim is essential. For standing crops, a spray of Propiconazole (TILT) at the heading stage can prevent the spread. Crop rotation with non-cereal crops is highly recommended to clear the soil of spores."
      }
    ],

    rice: [
      {
        name: "Rice Blast",
        symptoms: "The most common symptom is diamond-shaped (spindle) spots on the leaves with gray centers. In severe cases, the nodes turn black and the neck of the panicle rots, causing the grain heads to break and fall over, leading to total yield loss.",
        treatment: "Avoid excessive nitrogen application and maintain consistent water levels. For chemical control, spray Tricyclazole 75% WP or Carbendazim 50% WP at the first sign of infection. Treat seeds with fungicides before sowing to prevent early-stage outbreaks."
      },
      {
        name: "Bacterial Blight",
        symptoms: "Leaves turn yellow or straw-colored starting from the tips and edges, moving downwards in wavy stripes. You may see yellowish milky ooze droplets on leaves in the morning, which eventually dry into small yellowish crusts.",
        treatment: "Avoid flooding and reduce nitrogen usage immediately. Use balanced potash fertilizers to strengthen plant immunity. Spray a mixture of Copper Oxychloride (2.5g/L) and Streptocycline (1g/10L) twice at a 10-day interval for effective control."
      },
      {
        name: "Sheath Blight",
        symptoms: "Irregular green-gray spots appear on the leaf sheaths near the water line, later developing a grayish-white center with a reddish-brown border. The disease can quickly travel up the plant, causing the leaves to dry out and the entire plant to collapse.",
        treatment: "Ensure wider plant spacing to allow better air circulation and sunlight. Keep the field free from weeds which act as hosts for the fungus. Spray Validamycin 3L or Hexaconazole 5% EC (2ml/L) directed towards the base of the plants for the best results."
      },
      {
        name: "Brown Spot",
        symptoms: "Small, circular to oval brown spots appear on leaves, resembling sesame seeds with a light brown center. This disease often indicates poor soil nutrition or 'hungry soil', and infected seeds may show dark brown or black discoloration.",
        treatment: "Improve soil fertility by applying balanced doses of NPK, especially potash and micronutrients like Zinc. For chemical control, spray Mancozeb (2g/L) or Carbendazim. Proper seed treatment and using high-quality, nutrient-rich soil are essential for prevention."
      }
    ],
    mustard: [
      {
        name: "White Rust",
        symptoms: "Prominent white, creamy pustules (blisters) appear on the underside of leaves and stems. In severe cases, the flowers become deformed and 'staghead' formation occurs, leading to no seed setting.",
        treatment: "Spray Metalaxyl 8% + Mancozeb 64% (Ridomil Gold) at 2g/L of water. Avoid late sowing and ensure clean cultivation by removing infected crop residues."
      },
      {
        name: "Alternaria Blight",
        symptoms: "Circular, dark brown spots with concentric rings (target board appearance) appear on leaves, stems, and pods. These spots eventually merge, causing leaves to wither and seeds to shrivel.",
        treatment: "Spray Mancozeb (2.5g/L) or Iprodione at 15-day intervals starting from the first sign of infection. Use certified disease-free seeds and maintain proper plant spacing."
      },
      {
        name: "Downy Mildew",
        symptoms: "Pale yellow, irregular spots appear on the upper surface of leaves, while a grayish-white fungal growth is visible on the underside. High humidity and cool weather fast-track the spread.",
        treatment: "Spray Metalaxyl (2g/L) or Copper Oxychloride. Ensure proper drainage in the field to reduce humidity and avoid dense planting to allow air circulation."
      },
      {
        name: "Powdery Mildew",
        symptoms: "White, floury patches cover the leaves, stems, and pods, making the plant look like it's dusted with flour. It reduces photosynthesis, leading to poor plant growth and low oil content.",
        treatment: "Spray Wettable Sulphur (3g/L) or Karathane at the initial stage. Early sowing can help the crop escape the peak period of this disease."
      },
      {
        name: "Mosaic Virus",
        symptoms: "Leaves show mottling with light and dark green patches (mosaic pattern), often accompanied by stunted plant growth and puckered leaves. It is primarily spread by aphids (insects).",
        treatment: "Control the aphid population by spraying Imidacloprid or Dimethoate. Remove and destroy infected plants immediately to prevent the virus from spreading further."
      }
    ],
    sugarcane: [
      {
        name: "Red Rot",
        symptoms: "The internal tissue of the stalk turns red with white cross-bands. Leaves start withering from the top, and a distinct alcoholic smell is emitted when the infected cane is split open.",
        treatment: "Use disease-free healthy sets for planting. Treat sets with Carbendazim before sowing. If found in the field, uproot the entire clump and drench the spot with fungicide."
      },
      {
        name: "Smut",
        symptoms: "A long, black, whip-like structure covered with dusty spores emerges from the top of the cane. The infected plants produce thin, grass-like tillers and stunted stalks.",
        treatment: "Remove and burn the black whips carefully using a cloth bag to avoid spore spread. Use resistant varieties and avoid taking ratoon crops from infected fields."
      },
      {
        name: "Wilt",
        symptoms: "Cane shows gradual yellowing and drying of leaves. Internally, the pith turns reddish-brown and becomes hollow. The stalks become light in weight and lose juice content.",
        treatment: "Ensure balanced NPK application and avoid waterlogging. Use healthy planting material and treat sets with fungicides like Benomyl or Carbendazim."
      },
      {
        name: "Grassy Shoot",
        symptoms: "Affected plants produce a large number of thin, yellowish-white, grass-like shoots at the base. The stalks are either not formed or remain very short and thin.",
        treatment: "Uproot and destroy the infected clumps immediately. Use healthy sets from nurseries and treat them with hot water (50°C for 2 hours) before planting."
      },
      {
        name: "Leaf Scald",
        symptoms: "A sharp, narrow, white 'pencil-line' streak appears on the leaf blade along the veins. In later stages, the leaves wither from the tip, looking like they have been scalded by hot water.",
        treatment: "Strictly use resistant sugarcane varieties. Disinfect harvesting tools with bleach or alcohol to prevent mechanical transmission from one plant to another."
      }
    ]
  },
  soilPage: {
    stepsTitle: "Soil Testing Steps",
    phTitle: "Soil pH Importance",
    tipsTitle: "Farmer Tips",
  
    sugarcane: {
      steps: [
        "Identify 10-15 representative spots in your field in a zig-zag pattern for balanced sampling.",
        "Dig 12 inches (30 cm) deep; Sugarcane is a deep-rooted crop, so surface soil testing isn't enough.",
        "Discard the top thin layer of debris, then take a vertical slice of soil from the bottom to the top of the hole.",
        "Mix all samples in a clean plastic bucket and use the 'quartering' method to select the final 500g sample.",
        "Air-dry the soil in shade; avoid drying near chemicals or smoke to prevent contamination of results.",
        "Label the bag with details like 'New Planting' or 'Ratoon Management' to get specific fertilizer advice."
      ],
      ph: "Sugarcane thrives in soil with pH 6.5 - 7.5. (Extreme pH levels below 5.0 can cause aluminum toxicity).",
      tips: [
        "Test your soil every year if you take a ratoon crop, as sugarcane heavily depletes soil nutrients.",
        "Check for Silicon and Manganese levels; Silicon helps in making the cane stalk hard and resistant to pests.",
        "Apply Phosphate-rich fertilizers at the root zone (deep placement) rather than broadcasting on the surface.",
        "Use organic mulch or press-mud to improve soil moisture retention and provide slow-release nutrients."
      ]
    },
  
    wheat: {
      steps: [
        "Identify 8-10 spots in your field in a zig-zag pattern for a representative sample.",
        "Dig a V-shaped hole (6-9 inches deep) and take a thin slice of soil from the side.",
        "Mix all collected samples thoroughly in a plastic bucket and remove stones, roots, and debris.",
        "Spread the soil on a clean paper in shade to dry; never dry it directly under the sun or on a stove.",
        "Reduce the final mixture to about 500 grams using the 'quartering method' and pack it in a clean cloth bag.",
        "Label the bag with your name, field number, and previous crop details before sending it to the lab."
      ],
      ph: "Wheat grows best in well-drained loamy soil with a pH between 6.0 and 7.5. (pH below 5.5 can limit nutrient uptake).",
      tips: [
        "Do not collect soil from areas near trees, fences, irrigation channels, or where manure was recently piled.",
        "The best time for testing is after harvest or 1-2 months before sowing the next crop.",
        "Focus on Secondary Nutrients: Along with NPK, check for Zinc and Sulphur levels which are critical for wheat yield.",
        "Apply organic manure (FYM) to improve soil structure and enhance the efficiency of chemical fertilizers."
      ]
    },
  
    rice: {
      steps: [
        "Choose 10-12 random spots in a zig-zag manner, keeping away from bunds and water channels.",
        "Since rice roots are fibrous and shallow, dig a V-shaped hole up to 6 inches (15 cm) deep.",
        "Collect a thin slice of soil from the side of the hole; if the field is wet, let the mud dry slightly before mixing.",
        "Mix all collected soil in a clean plastic bucket and use the 'quartering method' to finalize a 500g sample.",
        "Air-dry the soil in shade on a clean plastic sheet; never use a cloth that previously held fertilizers or chemicals.",
        "Label the sample clearly with your name, village, and whether you follow the 'Transplanting' or 'Direct Seeding' (DSR) method."
      ],
      ph: "Rice thrives in slightly acidic to neutral soil (pH 5.5–7.0). It is highly tolerant to flooded (anaerobic) soil conditions.",
      tips: [
        "Check specifically for Zinc (Zn) levels; Zinc deficiency (Khaira disease) is the most common problem in rice fields.",
        "Apply Iron (Fe) through foliar spray if the soil report shows deficiency, especially in light-textured soils.",
        "Incorporate Dhaincha (Green Manure) 45-50 days before transplanting to naturally fix nitrogen and improve soil health.",
        "Manage water carefully; keep the soil saturated but avoid constant deep flooding to allow the roots to breathe and absorb nutrients."
      ]
    },
  
   mustard: {
      steps: [
        "Select 8-10 random spots in a zig-zag pattern across the field, avoiding areas near the fence or shade.",
        "Dig a V-shaped hole about 6 inches (15 cm) deep and collect a thin slice of soil from top to bottom.",
        "Place all samples in a clean plastic container and remove any stones, roots, or old crop residue.",
        "Thoroughly mix the soil and keep only about 500 grams using the 'quartering' method.",
        "Spread the soil on a clean paper and dry it in the shade; do not use artificial heat or direct sunlight.",
        "Pack the sample in a clean, labeled cloth bag and send it to the nearest soil testing lab before sowing."
      ],
      ph: "Mustard thrives in well-drained loamy soil with a pH between 6.0 and 7.5. It can tolerate moderate salinity.",
      tips: [
        "Sulphur is critical: Ensure your soil test includes Sulphur levels, as it directly increases the oil percentage in seeds.",
        "Apply Gypsum or elemental Sulphur if the report shows a deficiency, ideally 2-3 weeks before sowing.",
        "Mustard is sensitive to Boron deficiency; check for it to prevent 'hollow heart' or poor pod formation.",
        "Ensure the field is well-leveled to avoid waterlogging, as mustard roots are highly sensitive to standing water."
      ]
    }
  },
  account: {
    title: "Account",
    companyName: "Naqia Farm",
    tagline: "Smart Crop Care & Disease Solutions",
    menu: {
      orders: "Orders / History",
      language: "Language",
      help: "Help & Support",
      address: "Office Address",
    },
  },
  office: {
    title: "Office Address",
    addressTitle: "KrishiCool",
    address: "Hisampur, Pakwada Dingarpur Road, Moradabad, UP, India",
    phone: "+919718060881",
    email: "mohdshehwaz@gmail.com",
    openMap: "Open in Maps"
  },
  help: {
    title: "Help & Support",
    heading: "Need Help?",
    subtitle: "Contact us for any farming guidance or issues",
    call: "Call Support",
    whatsapp: "Chat on WhatsApp",
    email: "Send Email",
  }
};

export default en;