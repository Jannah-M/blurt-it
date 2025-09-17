# Blurt It!

Blurt It! is a React web app that makes studying easier, by streamlining a popular study method called blurting.

Blurting is a study method where you actively retrieve information from memory. To use the blurting method, you first review the material you're trying to study. Once you feel ready, put away the material. Then, type out all the information you can remember about the topic into this tool. It doesn't have to be in order, or with perfect grammar- just get it onto the screen. Then click Analyze. Powered by the OpenAI API, Blurt It! will provide you with three lists: correct concepts, incorrect concepts, and suggested further concepts to fill in the gaps. After reviewing your personalized feedback, study the topic again, paying extra attention to the parts you didn't get the first time. Keep repeating this process until you feel confident in your knowledge!
Currently, BlurtIt! is intended for studying topics related to computer science to ensure model reliability, but I am working to expand this.

The app is built with React/Next.js and deployed to [Vercel](https://classycloud.streamlit.app).


## Features
- Ability to instantly predict cloud type based on an uploaded image.
- Trained PyTorch CNN model (`cloud_cnn.pth`) for three cloud categories.  
- Fast and lightweight web interface powered by Streamlit, with hand-draw illustrations by me!


## Tech Stack
- Python 3.10
- PyTorch for the convolutional neural network
- Torchvision for image transforms
- Streamlit for the interactive UI
- JS Paint for illustrations


## Demo
Try it live: [classycloud.streamlit.app](https://classycloud.streamlit.app)

Please note that this project is hosted using the free tier of Streamlit. This means that after a period of inactivity (usually around one day), the app will need to be reawakened by clicking the "Wake Up" button prompted by Streamlit. This restarts the app, and will take about 30 seconds to load. 

## Model Details
- Architecture: Convolutional network (several conv and pooling layers, followed by dense layers)
- Input size: 128 × 128 RGB images.
- Output: 3-class classification (Cirrus / Cumulus / Stratus).
- Saved weights: `gui/cloud_cnn.pth`
- Trained on the Harvard Dataverse CCSN Database, cleaned and re-labeled by me (Liu, Pu, 2019, "Cirrus Cumulus Stratus Nimbus (CCSN) Database", https://doi.org/10.7910/DVN/CADDPD, Harvard Dataverse, V2)

## Local Setup

Clone the repo and run locally:

```bash
git clone https://github.com/Jannah-M/classy-cloud.git
cd classy-cloud
pip install -r requirements.txt
streamlit run gui/app.py
```
## **License**

MIT License

## **Author**

Jannah Mansoor

Feel free to contact me via [LinkedIn](https://www.linkedin.com/in/jannahmansoor/)!
