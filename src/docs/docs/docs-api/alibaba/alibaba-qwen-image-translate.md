# /docs/docs-api/alibaba/alibaba-qwen-image-translate

来源: https://wavespeed.ai/docs/docs-api/alibaba/alibaba-qwen-image-translate

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")AlibabaAlibaba Qwen Image Translate

# Alibaba Qwen Image Translate

Alibaba Qwen Image Translate

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/alibaba/qwen-image/translate)

Advanced AI model for image understanding, OCR, and text translation with Alibaba Qwen Vision.

## Features[](#features)

# Alibaba Qwen Vision - Image Understanding & Translation

Alibaba Qwen Vision is a multimodal AI model that integrates **OCR (optical character recognition)** and **multilingual translation**. Built on **Alibaba Cloud’s DashScope**, it can extract text from images and translate it into multiple languages quickly and accurately.

## Why it looks great[](#why-it-looks-great)

*   **Accurate OCR:** recognizes printed and handwritten text from images.
*   **Multi-language support:** detect and translate across English, Chinese, Japanese, Korean, French, German, Spanish, Russian, Arabic, and more.
*   **Customizable translation:** define **terminologies** and filter **sensitive words** for domain-specific use cases.
*   **Document understanding:** works with forms, receipts, signage, and scanned documents.
*   **Real-time performance:** fast turnaround for practical scenarios like menus, signs, and learning materials.

## Limits and Performance[](#limits-and-performance)

*   **Supported formats:** PNG, JPEG, WEBP
*   **Processing speed:** ~**3–6 seconds per image**
*   **Segmentation:** automatic text region detection (can be disabled via `skip_image_segment`)

## Pricing[](#pricing)

Task Type

Cost per image

OCR / Translation

$0.01

## How to Use[](#how-to-use)

1.  Upload the **image** containing text.
2.  Select **source\_lang** (e.g., **auto**, **en**, **zh**, **ja**, **ko**, **fr**, **de**, **es**, **ru**, **ar**).
3.  Select **target\_lang** for translation.
4.  (Optional) Add **sensitives** to filter sensitive words.
5.  (Optional) Add **terminologies** to ensure consistent translations for key terms.
6.  (Optional) Check **skip\_image\_segment** if you don’t want automatic segmentation.
7.  Run the job and download/view the results.

## Pro tips for best quality[](#pro-tips-for-best-quality)

*   Upload high-resolution images with clear text for better OCR accuracy.
*   Use auto for source\_lang when handling mixed or unknown languages.
*   Add **terminologies** for industry-specific vocabulary (e.g., finance, medicine).
*   Filter sensitive words via **sensitives** for safer outputs.
*   Keep segmentation enabled for documents with multiple text regions.

## Notes[](#notes)

*   Best for **document digitization, translation of signage/menus, multilingual education, and accessibility tools**.
*   If you did not upload the image locally, please ensure that the image URL is accessible! A successfully accessible image will display a preview in the interface.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/alibaba/qwen-image/translate" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "source_lang": "auto",
    "target_lang": "zh",
    "sensitives": [],
    "terminologies": [],
    "skip_image_segment": false
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

The image to process for translation

source\_lang

string

No

auto

auto, en, zh, ja, ko, fr, de, es, ru, ar

Source language code (auto for auto-detection)

target\_lang

string

Yes

zh

en, zh, ja, ko, fr, de, es, ru, ar

Target language code for translation

domain\_hint

string

No

\-

\-

If you want the translation style to be more in line with the characteristics of a certain field, you can use English to describe the usage scenario, translation style and other field requirements. In order to ensure the translation effect, it is recommended that the length does not exceed 200 English words.

sensitives

array

No

\[\]

\-

Array of sensitive words to filter

terminologies

array

No

\[\]

\-

Array of terminoogies to use for translation

skip\_image\_segment

boolean

No

false

\-

Whether to skip image segmentation

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

[Character AI Ovi Text To Video](/docs/docs-api/character-ai/character-ai-ovi-text-to-video "Character AI Ovi Text To Video")[Alibaba Qwen3 Tts Flash](/docs/docs-api/alibaba/alibaba-qwen3-tts-flash "Alibaba Qwen3 Tts Flash")