export default {
  apps : [{
    name        : "APPool",
    script      : "./src/index.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  },{
    name        : "APGrowFinance",
    script      : "./src/bots/APGrowFinance/index.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  },
  {
    name        : "APNyseBrok",
    script      : "./src/bots/APNyseBrok/index.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  },
  {
    name        : "APBenefitFX",
    script      : "./src/bots/APBenefitFX/index.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  },
  {
    name        : "APTryton",
    script      : "./src/bots/APTryton/index.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}