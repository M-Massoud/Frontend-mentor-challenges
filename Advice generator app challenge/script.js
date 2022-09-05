const generateAdviceBtn = document.querySelector('.dice-button');
const adviceNumberElm = document.querySelector('.advice-number span');
const adviceContentElm = document.querySelector('.advice-content q');

const generateAdvice = async function () {
  try {
    const adviceRequest = await fetch('https://api.adviceslip.com/advice');
    const adviceData = await adviceRequest.json();
    // console.log(adviceData);

    // update the UI
    adviceNumberElm.textContent = adviceData.slip.id;
    adviceContentElm.textContent = `${adviceData.slip.advice}`;
    return adviceData;
  } catch (error) {
    console.log(error);
  }
};

generateAdviceBtn.addEventListener('click', generateAdvice);
