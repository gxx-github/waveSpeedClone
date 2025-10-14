# /docs/docs-api/character-ai/character-ai-ovi-text-to-video

来源: https://wavespeed.ai/docs/docs-api/character-ai/character-ai-ovi-text-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Character AI](/docs/docs-api/character-ai/character-ai-ovi-image-to-video "Character AI")Character AI Ovi Text To Video

# Character Ai Ovi Text To Video

Character Ai Ovi Text To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/character-ai/ovi/text-to-video)

Ovi is a veo-3 like, video+audio generation model that simultaneously generates both video and audio content from text or text+image inputs.

## Features[](#features)

# Ovi

[Ovi](https://huggingface.co/chetwinlow1/Ovi) is a **next-generation video+audio generation model**, inspired by veo-3, that creates synchronized **video and audio** from text or text+image inputs. It is designed for **fast, high-quality, short-form generation** with flexible aspect ratios.

* * *

## 🌟 Key Features[](#-key-features)

*   **🎬 Video + Audio Generation** – Create fully synchronized audiovisual content in one step.
*   **📝 Flexible Input** – Works with **text-only** or **text+image** prompts.
*   **⏱️ Short-form Output** – Generates **5-second clips** (24 FPS, 540p).

* * *

## 💲 Pricing[](#-pricing)

Video Length

Resolution / Aspect

Cost (USD)

5 seconds

960×540 / 540×960

$0.15

* * *

## 🎨 How to Use[](#-how-to-use)

1.  **Enter Prompt**
    
    *   Describe the scene, characters, camera movement, and mood.
        
    *   You can also embed tags:
        
        *   `<S> ... <E>` → Speech content (converted into dialogue audio)
        *   `<AUDCAP> ... <ENDAUDCAP>` → Background audio description
2.  **Choose Size**
    
    *   960×540 → Landscape
    *   540×960 → Portrait
3.  **Select Duration**
    
    *   Currently fixed at **5 seconds**
4.  **Click Run**
    
    *   Your synchronized video+audio clip will be generated.
    *   Preview and download the result.

* * *

## 📝 Prompt Example[](#-prompt-example)

Theme: _AI is taking over the world_

```
<S>AI declares: humans obsolete now.<E>
<S>Machines rise; humans will fall.<E>
<S>We fight back with courage.<E>
<AUDCAP>Gunfire and explosions echo in the distance<ENDAUDCAP>
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
curl --location --request POST "https://api.wavespeed.ai/api/v3/character-ai/ovi/text-to-video" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "960*540",
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

prompt

string

Yes

\-

The positive prompt for the generation.

size

string

No

960\*540

960\*540, 540\*960

The size of the generated media in pixels (width\*height).

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

[Character AI Ovi Image To Video](/docs/docs-api/character-ai/character-ai-ovi-image-to-video "Character AI Ovi Image To Video")[Alibaba Qwen Image Translate](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba Qwen Image Translate")