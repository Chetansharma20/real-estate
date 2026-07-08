import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

const LOCALITY_MAPS: Record<string, string> = {
  "bandra west": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.488330752538!2d72.8258564!3d19.0558482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9410830616d%3A0x2f7d3d9646b9a897!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  "lower parel": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.399587425126!2d72.8268297!3d19.0020473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cef7d2d3e911%3A0x6e2467d3e6cb9080!2sLower%20Parel%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  "worli": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.673891461159!2d72.8122394!3d18.9981881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cefa7e3f8489%3A0x33e8b090886c8fbf!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  "juhu": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.824856011327!2d72.8228394!3d19.0981881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c97f48e3a2bf%3A0x6a0d0d9646b9a897!2sJuhu%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  "bkc": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.424856011327!2d72.8628394!3d19.0681881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e5473f8489%3A0x33e8b090886c8fbf!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  "powai": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.754856011327!2d72.9028394!3d19.1181881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c80f48e3a2bf%3A0x6a0d0d9646b9a897!2sPowai%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  "mumbai": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823483!2d72.74109781878036!3d19.08219803906263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
};

const DEFAULT_MAP = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823483!2d72.74109781878036!3d19.08219803906263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin";

async function main() {
  console.log("Fetching existing properties...");
  const properties = await prisma.property.findMany();
  console.log(`Found ${properties.length} properties. Updating location maps...`);

  let count = 0;
  for (const property of properties) {
    const localityKey = property.locality.toLowerCase().trim();
    let mapUrl = DEFAULT_MAP;

    // Check if we have a direct match for this locality
    for (const key in LOCALITY_MAPS) {
      if (localityKey.includes(key)) {
        mapUrl = LOCALITY_MAPS[key];
        break;
      }
    }

    await prisma.property.update({
      where: { id: property.id },
      data: { mapUrl }
    });
    count++;
  }

  console.log(`✅ Successfully updated map locations for ${count} properties.`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
