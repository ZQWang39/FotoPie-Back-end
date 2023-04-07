import { Injectable } from "@nestjs/common";
import * as tf from "@tensorflow/tfjs";
import * as tfhub from "@tensorflow-models/universal-sentence-encoder";

@Injectable()
export class NimaService {
  private model: any;

  async init() {
    this.model = await tfhub.load();
  }

  async predict(imageUrl: string): Promise<number> {
    const image = await this.loadImage(imageUrl);
    const embeddings = await this.getEmbeddings(image);
    const result = await this.model.predict(embeddings);
    return result.dataSync()[0];
  }

  private async loadImage(imageUrl: string): Promise<tf.Tensor3D> {
    const image = await fetch(imageUrl);
    const buffer = await image.arrayBuffer();
    const imageData = new ImageData(new Uint8ClampedArray(buffer), 224, 224);
    const tensor = tf.browser.fromPixels(imageData, 3);
    return tensor;
  }

  private async getEmbeddings(image: tf.Tensor3D): Promise<tf.Tensor2D> {
    const normalized = image.div(255.0);
    const resized = normalized.resizeBilinear([224, 224]);
    const batched = resized.expandDims(0);
    const embeddings = (await this.model.embed(batched)) as tf.Tensor2D;
    return embeddings;
  }
}
