# /docs/docs-quick-start

来源: https://wavespeed.ai/docs/docs-quick-start

Quick Start

# Quick Start

## Getting Started[](#getting-started)

### 1\. Create an Account[](#1-create-an-account)

Visit [WaveSpeedAI](https://wavespeed.ai/sign-in) to create your account.

### 2\. Start Creating[](#2-start-creating)

You can generate images in two ways:

#### API Integration[](#api-integration)

All WaveSpeedAI APIs require authentication. Please refer to our [Authentication Guide](/docs/docs-authentication) for details on how to obtain and use your API key.

Choose the API service you need to get started:

*   [Flux Dev](/docs/docs-api/flux-dev) - Fast development version of the Flux model
    
*   [Flux Dev Lora](/docs/docs-api/flux-dev-lora) - Flux model with Lora fine-tuning support
    
*   [Flux Schnell](/docs/docs-api/flux-schnell) - High-speed Flux model with Flux Schnell
    
*   [Flux Schnell Lora](/docs/docs-api/flux-schnell-lora) - High-speed Flux model with Lora support
    
*   [WAN T2V 720p](/docs/docs-api/wavespeed-ai/wan-2.2-t2v-720p) - High-resolution text-to-video model (720p)
    
*   [WAN T2V 720p Lora](/docs/docs-api/wavespeed-ai/wan-2.2-t2v-720p-lora) - High-resolution text-to-video with Lora (720p)
    
*   [WAN I2V 720p](/docs/docs-api/wavespeed-ai/wan-2.2-i2v-720p) - High-resolution image-to-video model (720p)
    
*   [WAN I2V 720p Lora](/docs/docs-api/wavespeed-ai/wan-2.2-i2v-720p-lora) - High-resolution image-to-video with Lora (720p)
    
*   [WAN T2V 480p](/docs/docs-api/wavespeed-ai/wan-2.2-t2v-480p) - Text-to-video conversion model (480p resolution)
    
*   [WAN T2V 480p Lora](/docs/docs-api/wavespeed-ai/wan-2.2-t2v-480p-lora) - Text-to-video model with Lora support (480p)
    
*   [WAN I2V 480p](/docs/docs-api/wavespeed-ai/wan-2.2-i2v-480p) - Image-to-video conversion model (480p resolution)
    
*   [WAN I2V 480p Lora](/docs/docs-api/wavespeed-ai/wan-2.2-i2v-480p-lora) - Image-to-video model with Lora support (480p)
    
*   [Hunyuan T2V](/docs/docs-api/wavespeed-ai/hunyuan-video-t2v) - Text-to-video model by Hunyuan
    
*   [Hunyuan I2V](/docs/docs-api/wavespeed-ai/hunyuan-video-i2v) - Image-to-video model by Hunyuan
    
*   [Kling V1.6 I2v Pro](/docs/docs-api/kwaivgi/kwaivgi-kling-v1.6-i2v-pro) - Text-to-video model by Kling
    
*   [Kling V1.6 I2v Standard](/docs/docs-api/kwaivgi/kwaivgi-kling-v1.6-i2v-standard) - Text-to-video model by Kling with Lora support
    
*   [Kling V1.6 T2v Standard](/docs/docs-api/kwaivgi/kwaivgi-kling-v1.6-t2v-standard) - Text-to-video model by Kling
    
*   [Minimax Video 01](/docs/docs-api/minimax-video-01) - Text-to-video model by Minimax
    

**Supported Programming Languages**

Our APIs can be accessed via HTTP requests from any programming language, including:

*   Python
*   JavaScript/TypeScript
*   Go
*   Java
*   PHP

For detailed API references and example code, please visit each model’s documentation page.

#### Web Interface[](#web-interface)

Click the model cards below to start creating directly in our web interface:

[![flux-dev-lora](/docs-assets/media/images/1754632715323723772_2gcqnjgb.png)](https://wavespeed.ai/models/wavespeed-ai/flux-dev-lora)

#### flux-dev-lora

For detailed API implementation and code examples, please refer to our [Introduction](/docs/docs) page.

### ComfyUI Integration[](#comfyui-integration)

Integrate WaveSpeedAI’s high-performance image and video generation services directly into ComfyUI with our custom nodes.

#### Key Features[](#key-features)

*   Seamless API access within ComfyUI
*   Multiple nodes for diverse AI tasks
*   LoRA support for style customization

#### Quick Setup[](#quick-setup)

1.  Get your API key from [WaveSpeedAI](https://wavespeed.ai)
2.  Install ComfyUI-WaveSpeedAI-API custom node:
    
    ```
    cd ComfyUI/custom_nodes
    git clone https://github.com/WaveSpeedAI/wavespeed-comfyui.git
    cd wavespeed-comfyui
    pip install -r requirements.txt
    ```
    
3.  Set your API key:
    *   In the Client node, or
    *   In `config.ini` (rename `config.ini.tmp` to `config.ini` and add your key)

For detailed node information and advanced usage, refer to our [GitHub repository](https://github.com/WaveSpeedAI/wavespeed-comfyui.git).

## Available Models[](#available-models)

### Image Generation[](#image-generation)

1.  **FLUX-dev**
    
    *   12B parameter high-performance model
    *   Generation speed: < 2 seconds
    *   Use case: General image generation
2.  **FLUX-lora**
    
    *   Fast image generation with LoRA support
    *   Features: Personalization, style adaptation, brand identity customization

### Video Generation[](#video-generation)

1.  **Hunyuan Video**
    
    *   High-quality video generation by Tencent
    *   Features: High quality, realistic results
    *   Generation time: ~2 minutes
2.  **WAN-2.1 T2V**
    
    *   Text-to-video generation
    *   Diverse motion generation
    *   Output: 5s 480/720p videos
3.  **WAN-2.1 I2V**
    
    *   Image-to-video generation
    *   Dynamic video from static images
    *   Maintains original image style

[Introduction](/docs/docs "Introduction")[Using in ComfyUI](/docs/docs-comfyui "Using in ComfyUI")