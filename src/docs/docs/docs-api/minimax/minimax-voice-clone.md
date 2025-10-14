# /docs/docs-api/minimax/minimax-voice-clone

来源: https://wavespeed.ai/docs/docs-api/minimax/minimax-voice-clone

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Minimax](/docs/docs-api/minimax/minimax-hailuo-02-fast "Minimax")Minimax Voice Clone

# Minimax Voice Clone

Minimax Voice Clone

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/minimax/voice-clone)

MiniMax Voice Clone is a state-of-the-art voice synthesis model developed by MiniMax. It enables high-quality voice cloning from a short reference clip, producing speech that closely mimics the tone, accent, and personality of the original speaker.

## Features[](#features)

# MiniMax Voice Clone

**MiniMax Voice Clone** is a state-of-the-art voice synthesis model developed by MiniMax. It enables high-quality voice cloning from a short reference clip, producing speech that closely mimics the tone, accent, and personality of the original speaker.

## Key Features[](#key-features)

*   **High-Fidelity Voice Cloning**  
    Generates speech that is perceptually close to the source speaker with natural prosody and pronunciation.
    
*   **Few-Second Voice Adaptation**  
    Requires only a few seconds of reference audio to accurately replicate a voice.
    
*   **Emotion and Tone Control**  
    Allows fine-tuned control over speaking style and emotion, useful for storytelling, games, and character dialogue.
    
*   **Multilingual Output**  
    Supports voice cloning across different languages and smooth code-switching.
    
*   **Low-Latency Inference**  
    Optimized for real-time use cases, including live interactions and dialogue generation.
    

## Use Cases[](#use-cases)

*   AI voiceovers for content creators and influencers
*   Personalized digital assistants and chatbots
*   Audiobook narration in a specific voice
*   Interactive gaming and character voices
*   Assistive speech for individuals with voice loss

## Model Overview[](#model-overview)

MiniMax Voice Clone uses a neural TTS pipeline with robust speaker embedding and prosody modeling. It combines clarity, control, and speed, offering production-ready results in diverse environments.

## Note[](#note)

Your clone **voice ID** must be used **at least once** with one of the voice models on our platform to be **saved permanently**. Such as:

*   [minimax/speech-02-hd](https://wavespeed.ai/models/minimax/speech-02-hd)
*   [minimax/speech-02-turbo](https://wavespeed.ai/models/minimax/speech-02-turbo)

Otherwise, we can only **store it for 7 days**. After that, it will be deleted and the voice ID will no longer be callable.

For easier reuse later, please make sure to use your voice ID once in one of the models above after creating it.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/minimax/voice-clone" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "model": "speech-02-hd",
    "need_noise_reduction": false,
    "need_volume_normalization": false,
    "accuracy": 0.7,
    "text": "Hello! Welcome to Wavespeed! This is a preview of your cloned voice. I hope you enjoy it!"
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

audio

string

Yes

\-

\-

The uploaded file is cloned and supports formats such as MP3, M4A, and WAV.

custom\_voice\_id

string

Yes

\-

\-

Custom user-defined ID. Minimum 8 characters; must include letters and numbers and start with a letter (e.g., WaveSpeed001). Duplicate voice-ids will throw an error.

model

string

Yes

speech-02-hd

speech-02-hd, speech-02-turbo, speech-2.5-hd-preview, speech-2.5-turbo-preview

Specify the TTS model to be used for the preview. This is only a preview after cloning. Once the model is generated, any Minimax Turbo or HD voice model can be used for inference.

need\_noise\_reduction

boolean

No

false

\-

Enable noise reduction. Default is false (no noise reduction).

need\_volume\_normalization

boolean

No

false

\-

Specify whether to enable volume normalization. If not provided, the default value is false.

accuracy

number

No

0.7

0.00 ~ 1.00

Uploading this parameter will set the text validation accuracy threshold, with a value range of \[0,1\]. If not provided, the default value for this parameter is 0.7.

text

string

No

Hello! Welcome to Wavespeed! This is a preview of your cloned voice. I hope you enjoy it!

\-

Text for audio preview. Limited to 2000 characters.

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

[Minimax Video 02](/docs/docs-api/minimax/minimax-video-02 "Minimax Video 02")[Minimax Voice Design](/docs/docs-api/minimax/minimax-voice-design "Minimax Voice Design")