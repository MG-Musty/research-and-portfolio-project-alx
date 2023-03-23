const dotenv = require('dotenv')

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
	case 'production':
		ENV_FILE_NAME = '.env.production';
		break;
	case 'staging':
		ENV_FILE_NAME = '.env.staging';
		break;
	case 'test':
		ENV_FILE_NAME = '.env.test';
		break;
	case 'development':
	default:
		ENV_FILE_NAME = '.env';
		break;
}

try {
	dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {
}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-store";

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  // {
  //   resolve: `medusa-payment-stripe`,
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },
    {
      resolve: `medusa-payment-paystack`,
      options: {
        secret_key: process.env.PAYSTACK_SECRET_KEY,
      },
    },
    {
      resolve: `medusa-payment-paypal`,
      options: {
        sandbox: process.env.PAYPAL_SANDBOX,
        client_id: process.env.PAYPAL_CLIENT_ID,
        client_secret: process.env.PAYPAL_CLIENT_SECRET,
        auth_webhook_id: process.env.PAYPAL_AUTH_WEBHOOK_ID,
      },
    },
    {
      resolve: `medusa-plugin-algolia`,
      options: {
        application_id: process.env.ALGOLIA_APP_ID,
        admin_api_key: process.env.ALGOLIA_ADMIN_API_KEY,
        settings: {
          products: {
            searchableAttributes: ["title", "description"],
            attributesToRetrieve: [
              "id",
              "title",
              "description",
              "handle",
              "thumbnail",
              "variants",
              "variant_sku",
              "options",
              "collection_title",
              "collection_handle",
              "images",
            ],
          },
        },
      },
    },
    {
      resolve: `medusa-file-minio`,
      options: {
          endpoint: process.env.MINIO_ENDPOINT,
          bucket: process.env.MINIO_BUCKET,
          access_key_id: process.env.MINIO_ACCESS_KEY,
          secret_access_key: process.env.MINIO_SECRET_KEY,
          //private_bucket: process.env.MINIO_PRIVATE_BUCKET,
          //private_access_key_id: process.env.MINIO_PRIVATE_ACCESS_KEY,
          //private_secret_access_key: process.env.MINIO_PRIVATE_SECRET_KEY,
      },
    },
    // {
    //   resolve: `medusa-file-s3`,
    //   options: {
    //       s3_url: process.env.S3_URL,
    //       bucket: process.env.S3_BUCKET,
    //       region: process.env.S3_REGION,
    //       access_key_id: process.env.S3_ACCESS_KEY_ID,
    //       secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    //   },
    // },
    {
      resolve: `medusa-file-s3`,
      options: {
          s3_url: process.env.S3_URL,
          bucket: process.env.S3_BUCKET,
          aws_config_object: {
            region: process.env.S3_REGION,
            access_key_id: process.env.S3_ACCESS_KEY_ID,
            secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
            accessKeyId: process.env.AWS_ACCESS_KEY,
            accessSecretKey: process.env.AWS_SECRET_KEY,
            region: "us-west-1"
          },
      },
    },
];
/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig: {
    // redis_url: REDIS_URL,
    // For more production-like environment install PostgresQL
    // database_url: DATABASE_URL,
    // database_type: "postgres",
    database_database: "./medusa-db.sql",
    database_type: "sqlite",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
  },
  plugins,
};
