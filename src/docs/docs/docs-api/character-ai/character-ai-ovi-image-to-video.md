# /docs/docs-api/character-ai/character-ai-ovi-image-to-video

来源: https://wavespeed.ai/docs/docs-api/character-ai/character-ai-ovi-image-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")Character AICharacter AI Ovi Image To Video

# Character Ai Ovi Image To Video

Character Ai Ovi Image To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/character-ai/ovi/image-to-video)

Ovi is a veo-3 like, video+audio generation model that simultaneously generates both video and audio content from text or text+image inputs.

## Features[](#features)

# Ovi (I2V Version)

[Ovi](https://huggingface.co/chetwinlow1/Ovi) is a veo-3 like, **image-to-audio-video (I2AV) generation model** that creates synchronized **video and audio** from a single image plus a descriptive text prompt.

It is designed for **short-form storytelling**, where a still image is brought to life with cinematic motion, dialogue, and sound.

* * *

## 🌟 Key Features[](#-key-features)

*   **🎬 Image → Video+Audio** – Bring a static image to life with synchronized audiovisual output.
*   **📝 Prompt-driven** – Use text prompts to control scene dynamics, style, and audio.
*   **🗣️ Speech & Sound** – Insert dialogue or sound effects using special tags.
*   **⏱️ Short-form Output** – Generates **5-second clips** at 24 FPS.

* * *

## 💲 Pricing[](#-pricing)

Video Length

Cost

5 seconds

$0.15

**Billing Rules**

*   Minimum charge: **5 seconds**

* * *

## 🎨 How to Use[](#-how-to-use)

1.  **Upload Image**
    
    *   Provide a reference image as the base frame.
    *   Make sure the URL is valid and accessible (a preview should appear).
2.  **Enter Prompt**
    
    *   Describe scene motion, style, and atmosphere.
        
    *   Use tags for sound:
        
        *   `<S> ... <E>` → Speech (converted into spoken audio)
        *   `<AUDCAP> ... <ENDAUDCAP>` → Background audio / effects
3.  **Set Seed**
    
    *   `-1` = random output
    *   Any fixed number = reproducible results
4.  **Run**
    
    *   Click **Run $0.15** to generate your **5s image-to-audio-video** clip.
    *   Preview and download the result.

* * *

## 📝 Prompt Example[](#-prompt-example)

```
A wide shot of a medieval knight standing in the rain, sword planted into the ground, glowing with mystical energy.  
<S>I will defend this land until my last breath.<E>  
<AUDCAP>Thunder rolls across the dark sky, distant war drums echo.<ENDAUDCAP>
```

* * *

## 🙏 Acknowledgements[](#-acknowledgements)

*   **[Wan2.2](https://github.com/Wan-Video/Wan2.2)** – Video backbone initialization
*   **[MMAudio](https://github.com/hkchengrex/MMAudio)** – Audio encoder/decoder inspiration

* * *

## ⭐ Citation[](#-citation)

If Ovi is useful, please ⭐ the repo and cite the paper:

```
@misc&#123;low2025ovitwinbackbonecrossmodal,
      title=&#123;Ovi: Twin Backbone Cross-Modal Fusion for Audio-Video Generation&#125;, 
      author=&#123;Chetwin Low and Weimin Wang and Calder Katyal&#125;,
      year=&#123;2025&#125;,
      eprint=&#123;2510.01284&#125;,
      archivePrefix=&#123;arXiv&#125;,
      primaryClass=&#123;cs.MM&#125;,
      url=&#123;https://arxiv.org/abs/2510.01284&#125;, 
&#125;
```

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/character-ai/ovi/image-to-video" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "seed": -1
}'

# Get the result
curl --location --request GET "https://api.wavespeed.ai/api/v3/predictions/${requestId}/result" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}"
```

## Parameters[](#parameters)

### Task Submission Parameters[](#task-submission-parameters)

#### Request Parameters[](#request-parameters)

Parameter

Type

Required

Default

Range

Description

image

string

Yes

\-

The image for generating the output.

prompt

string

Yes

\-

The positive prompt for the generation.

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

#### Response Parameters[](#response-parameters)

Parameter

Type

Description

code

integer

HTTP status code (e.g., 200 for success)

message

string

Status message (e.g., “success”)

data.id

string

Unique identifier for the prediction, Task Id

data.model

string

Model ID used for the prediction

data.outputs

array

Array of URLs to the generated content (empty when status is not `completed`)

data.urls

object

Object containing related API endpoints

data.urls.get

string

URL to retrieve the prediction result

data.has\_nsfw\_contents

array

Array of boolean values indicating NSFW detection for each output

data.status

string

Status of the task: `created`, `processing`, `completed`, or `failed`

data.created\_at

string

ISO timestamp of when the request was created (e.g., “2023-04-01T12:34:56.789Z”)

data.error

string

Error message (empty if no error occurred)

data.timings

object

Object containing timing details

data.timings.inference

integer

Inference time in milliseconds

#### Result Request Parameters[](#result-request-parameters)

[Openai Sora 2 Text To Video Pro](/docs/docs-api/openai/openai-sora-2-text-to-video-pro "Openai Sora 2 Text To Video Pro")[Character AI Ovi Text To Video](/docs/docs-api/character-ai/character-ai-ovi-text-to-video "Character AI Ovi Text To Video")