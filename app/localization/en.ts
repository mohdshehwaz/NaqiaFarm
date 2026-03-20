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
        symptoms: "Leaves develop reddish brown powder spots.",
        treatment: "Spray Propiconazole fungicide."
      },
      {
        name: "Loose Smut",
        symptoms: "Black powder appears in wheat ears.",
        treatment: "Treat seeds with Carbendazim."
      },
      {
        name: "Powdery Mildew",
        symptoms: "White powder appears on leaves.",
        treatment: "Spray Sulphur fungicide."
      },
      {
        name: "Leaf Blight",
        symptoms: "Long brown lesions on leaves.",
        treatment: "Spray Mancozeb."
      },
      {
        name: "Karnal Bunt",
        symptoms: "Black powder inside wheat grains.",
        treatment: "Use treated seeds."
      }
    ],

    rice: [
      {
        name: "Blast",
        symptoms: "Diamond shaped spots on leaves.",
        treatment: "Spray Tricyclazole."
      },
      {
        name: "Bacterial Blight",
        symptoms: "Leaves turn yellow from edges.",
        treatment: "Use Copper fungicide."
      },
      {
        name: "Sheath Blight",
        symptoms: "Brown spots on stems.",
        treatment: "Spray Validamycin."
      },
      {
        name: "Brown Spot",
        symptoms: "Brown circular spots on leaves.",
        treatment: "Spray Mancozeb."
      }
    ],

    mustard: [
      {
        name: "White Rust",
        symptoms: "White blister spots under leaves.",
        treatment: "Spray Metalaxyl fungicide."
      },
      {
        name: "Alternaria Blight",
        symptoms: "Dark circular spots on leaves.",
        treatment: "Spray Mancozeb."
      },
      {
        name: "Downy Mildew",
        symptoms: "Yellow spots with grey fungus layer.",
        treatment: "Spray Metalaxyl."
      },
      {
        name: "Powdery Mildew",
        symptoms: "White powder on leaves.",
        treatment: "Spray Sulphur fungicide."
      },
      {
        name: "Mosaic Virus",
        symptoms: "Yellow green patches on leaves.",
        treatment: "Control aphids insects."
      }
    ],

    sugarcane: [
      {
        name: "Red Rot",
        symptoms: "Stem becomes red inside.",
        treatment: "Use healthy seed cane."
      },
      {
        name: "Smut",
        symptoms: "Black whip like structure appears.",
        treatment: "Remove infected plants."
      },
      {
        name: "Wilt",
        symptoms: "Leaves dry and plant wilts.",
        treatment: "Use disease free setts."
      },
      {
        name: "Grassy Shoot",
        symptoms: "Many thin shoots appear.",
        treatment: "Remove infected plants."
      },
      {
        name: "Leaf Scald",
        symptoms: "White stripes appear on leaves.",
        treatment: "Use resistant varieties."
      }
    ]
  },
  soilPage: {
    stepsTitle: "Soil Testing Steps",
    phTitle: "Soil pH Importance",
    tipsTitle: "Farmer Tips",
  
    sugarcane: {
      steps: [
        "Take soil samples from different parts of the sugarcane field.",
        "Mix the soil properly and remove stones or plant residues.",
        "Place the soil sample in a clean plastic bag.",
        "Send the soil sample to a nearby soil testing laboratory.",
        "Follow fertilizer recommendations based on the soil report."
      ],
      ph: "Sugarcane grows best in soil with pH between 6.5 and 7.5.",
      tips: [
        "Use organic manure to improve soil fertility.",
        "Ensure proper drainage in the field.",
        "Avoid excessive chemical fertilizers."
      ]
    },
  
    wheat: {
      steps: [
        "Collect soil samples from different areas of the wheat field.",
        "Mix the samples and remove stones or debris.",
        "Dry the soil and pack it in a clean bag.",
        "Send the sample to a soil testing center.",
        "Apply fertilizers according to the soil test report."
      ],
      ph: "Wheat grows well in soil with pH between 6 and 7.",
      tips: [
        "Use balanced fertilizers.",
        "Maintain proper soil moisture.",
        "Practice crop rotation."
      ]
    },
  
    rice: {
      steps: [
        "Take soil samples from multiple spots in the rice field.",
        "Mix the soil and remove unwanted materials.",
        "Keep the soil sample in a clean container.",
        "Send it to a soil testing lab.",
        "Use fertilizers as recommended in the soil report."
      ],
      ph: "Rice grows well in slightly acidic to neutral soil (pH 5.5–7).",
      tips: [
        "Maintain proper water level in fields.",
        "Use organic compost.",
        "Avoid overuse of nitrogen fertilizer."
      ]
    },
  
    mustard: {
      steps: [
        "Collect soil samples from different areas of the mustard field.",
        "Mix the soil well and remove stones.",
        "Store the sample in a clean bag.",
        "Send the sample to a soil testing laboratory.",
        "Follow the fertilizer recommendation from the report."
      ],
      ph: "Mustard grows best in soil with pH between 6 and 7.5.",
      tips: [
        "Use organic manure regularly.",
        "Avoid waterlogging in the field.",
        "Apply balanced fertilizers."
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