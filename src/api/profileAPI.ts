import {PhotosType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";

type UpdateProfileImageResponseDataType = {
    photos: PhotosType
}
export const profileAPI = {
    getProfileData(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status})
            .then(res => res.data)
    },
    updateProfileImage(imageFile: File) {
        const formData = new FormData();
        formData.append('image', imageFile)
        return instance.put<APIResponseType<UpdateProfileImageResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    updateProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile)
            .then(res => res.data)
    }
}
