![https://altcode-qrrate.onrender.com/](https://github.com/K-Daksh/altcode/blob/main/forReadme/qrrate.png)

# Altcode ([Qrrate](https://altcode-qrrate.onrender.com)) ☁️
___
 
___


#### Introducing Altcode (formerly known as Qrrate): Your Gateway to Limitless Cloud Storage! ☁️

Altcode is an open-source web application built in Node.js, designed to transform your approach to file storage. It takes files of any format and ingeniously converts them into video files that can be seamlessly uploaded to YouTube. What's remarkable is that YouTube imposes no hard limits on the size of the files you can upload, effectively granting you unlimited cloud storage for your data.

#### Here's how Altcode works its ✨Magic ✨

- File Conversion: Altcode converts your files into video format, with a compression ratio of just __3.2x__ the original size. This minimal increase ensures efficient storage while maintaining a high success rate during the conversion process, reducing the risk of corruption.

- Reliability: Altcode is the result of continuous refinement, now in its impressive __4th edition__. This ensures the highest quality and reliability when converting your files into videos and back.

- Advanced Processing: Behind the scenes, Altcode harnesses the power of __JIMP__ for advanced image processing and relies on __FFMPEG__ and __FFMPEG-FLUENT__ for video processing, guaranteeing a seamless and efficient conversion process.

__Say goodbye to storage limitations and embrace the future of file management with Altcode.__


__Note:__ 'The deployed site does not have good enough processing abilities due to the platform used, please do not try to process files of size more than 50MBs'

 __Altcode-Qrrate__

![](https://github.com/K-Daksh/altcode/blob/main/forReadme/altcode-qrrate-gif.gif)


__Demo Video Output created for 20MB file, this gif is slowed to 0.009x for frames to be visible, the real length of the video was 0 seconds__

![](https://github.com/K-Daksh/altcode/blob/main/forReadme/binary-bits.gif)



#### A demo video uploaded online https://youtu.be/dCdm5q5_GtQ
`Warning: Project Usage Disclaimer`
>
> 
> This project, Altcode, was created primarily for experimentation and testing the capabilities of Node.js. It is essential to understand the following points before using this application:
> 
> > **Respect Google and YouTube Policies:** Altcode is not intended for the misuse or harassment of Google's or YouTube's platforms. It is crucial to use this application in compliance with their terms of service and policies. Any abuse or violation of these policies is entirely your responsibility, and the project creator disclaims any involvement in such actions.
> 
> > **Legal Responsibility:** The project creator, maintainers, and contributors bear no responsibility for any legal actions, consequences, or penalties that may arise from the misuse or inappropriate use of this application. Users are solely responsible for ensuring that their actions comply with all relevant laws and regulations.
> 
> > **File Conversion:** Altcode employs a conversion process that changes files into video format and back. While efforts have been made to minimize the risk of data corruption, there is no guarantee against such issues. Users should know that data loss or corruption may occur during the conversion process.
> 
> By using Altcode, you acknowledge and agree to these terms and conditions. Using this project responsibly and ethically is essential, respecting all applicable laws and the policies of any third-party platforms you interact with, such as YouTube and Google.

 



## Tech

Altcode uses numerous technologies for advanced file processing:

- Node js
- Jimp
- ffmpeg
- ffmpeg-fluent
- adm-zip
- progress
- chokidar
- express-fileupload
- Js (ofc)

This project is deployed using **Render**
 

## Installation

Altcode was developed on [Node.js](https://nodejs.org/) 8.13.0 .

Install the dependencies and start the server.

```sh
cd altcode
npm install
npm run start
```






## License

__Mozilla Public License 2.0__
