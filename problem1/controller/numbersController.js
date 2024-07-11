import axios from "axios"

let numbers = []
const WINDOW_SIZE = 10;

const fetchNumbersFromServer = async (type) => {
  try {
    const res = await axios.post(
      `${process.env.TEST_SERVER_URL}/test/auth`,
      {
        companyName: process.env.COMPANY_NAME,
        ownerName: process.env.OWNER_NAME,
        rollNo: process.env.ROLL_NO,
        ownerEmail: process.env.OWNER_EMAIL,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      }
    )

    const response = await axios.get(
      `${process.env.TEST_SERVER_URL}/test/${type}`,
      {
        headers: {
          'Authorization': `Bearer ${res.data.access_token}`
        },
        timeout: 500
      }
    );
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching numbers: ${error.message}`);
    return [];
  }
};

const updateWindow = (newNumbers) => {
  const uniqueNewNumbers = [...new Set(newNumbers)];
  const windowPrevState = [...numbers];

  numbers = [...numbers, ...uniqueNewNumbers].slice(-WINDOW_SIZE);

  const windowCurrState = [...numbers];
  const avg = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;

  return { windowPrevState, windowCurrState, avg: avg.toFixed(2) };
};

export const handleRequest = async (req, res, type) => {
  const newNumbers = await fetchNumbersFromServer(type);
  const { windowPrevState, windowCurrState, avg } = updateWindow(newNumbers);

  res.json({
    numbers: newNumbers,
    windowPrevState,
    windowCurrState,
    avg
  });
};

export const getEven = (req, res) => {
  handleRequest(req, res, "even")
}

export const getPrime = (req, res) => {
  handleRequest(req, res, "primes")
}


export const getFibonnaci = (req, res) => {
  handleRequest(req, res, "fibo")
}


export const getRandom = (req, res) => {
  handleRequest(req, res, "rand")
}
