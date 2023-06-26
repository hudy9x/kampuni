import { Status_Setting } from "@prisma/client"
import { statusSettingModel } from "./_prisma"

export const mdStatusSettingAdd = async (data: Omit<Status_Setting, 'id'>) => {

	return statusSettingModel.create({
		data: data
	})
}

export const mdStatusSettingGetAll = async () => {
 return statusSettingModel.findMany()
}

export const mdStatusSettingDel =async (id : string) => {
 return statusSettingModel.delete({
  where: {
   id
  }
 })
}
