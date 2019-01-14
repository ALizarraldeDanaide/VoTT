import axios, { AxiosRequestConfig } from "axios";
import { IAsset, AssetType } from "../models/applicationState";
import Guard from "./guard";

export default class HtmlFileReader {
    public static readAsText(file: File): Promise<string | ArrayBuffer> {
        Guard.null(file);

        return new Promise<string | ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result);
                } else {
                    reject();
                }
            };

            try {
                reader.readAsText(file);
            } catch (err) {
                reject(err);
            }
        });
    }

    public static async readAssetAttributes(asset: IAsset)
        : Promise<{ width: number, height: number, duration?: number }> {
        Guard.null(asset);

        switch (asset.type) {
            case AssetType.Image:
                return await this.readImageAttributes(asset.path);
            case AssetType.Video:
                return await this.readVideoAttributes(asset.path);
            default:
                throw new Error("Asset not supported");
        }
    }

    /**
     * Downloads the binary blob from the blob path
     * @param asset The asset to download
     */
    public static async getAssetBlob(asset: IAsset): Promise<Blob> {
        Guard.null(asset);

        const config: AxiosRequestConfig = {
            responseType: "blob",
        };

        // Download the asset binary from the storage provider
        const response = await axios.get<Blob>(asset.path, config);
        if (response.status !== 200) {
            throw new Error("Error downloading asset binary");
        }

        return response.data;
    }

    private static readVideoAttributes(url: string): Promise<{ width: number, height: number, duration: number }> {
        return new Promise((resolve, reject) => {
            const video = document.createElement("video") as HTMLVideoElement;
            video.onloadedmetadata = () => {
                resolve({
                    width: video.videoWidth,
                    height: video.videoHeight,
                    duration: video.duration,
                });
            };
            video.onerror = reject;
            video.src = url;
        });
    }

    private static readImageAttributes(url: string): Promise<{ width: number, height: number }> {
        return new Promise((resolve, reject) => {
            const image = document.createElement("img") as HTMLImageElement;
            image.onload = () => {
                resolve({
                    width: image.naturalWidth,
                    height: image.naturalHeight,
                });
            };
            image.onerror = reject;
            image.src = url;
        });
    }
}