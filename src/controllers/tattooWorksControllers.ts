import { TattooWork } from "../models/TattooWork";
import { formatPaginationResponse, formatTattooWork } from "../utils/format";
import { validateTattooWorkData } from "../utils/tattooWorkValidation";
import { CurrentUserData } from "../types";
import { TattooWorkData, TattooWorkQuery } from "../types/tattooWorks";

//Admin CRUD
export const getTattooWorkById = async (id: number) => {
  const tattooWork = await TattooWork.findOne({
    where: { id },
  });
  if (!tattooWork) throw { code: 404, message: "Tatto work not found" };
  return { data: formatTattooWork(tattooWork) };
};

export const getTattooWorks = async (
  query: TattooWorkQuery,
  user?: CurrentUserData
) => {
  let { pageSize = 10, page = 1 } = query;
  pageSize = parseInt(pageSize as string);
  page = parseInt(page as string);

  if (user) query.tattooistId = user.userId;

  delete query.page;
  delete query.pageSize;

  const [tattooWorks, totalItems] = await TattooWork.findAndCount({
    relations: ["tattooist"],
    where: query,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return formatPaginationResponse({
    page,
    pageSize,
    totalItems,
    items: tattooWorks.map(formatTattooWork),
  });
};

export const createTattooWork = async (
  data: TattooWorkData,
  user?: CurrentUserData
) => {
  validateTattooWorkData(data);
  if (user) data.tattooistId = user.userId;
  const createdTattooWork = await TattooWork.create(data).save();
  return { data: formatTattooWork(createdTattooWork) };
};

export const updateTattooWork = async (
  id: number,
  data: TattooWorkData,
  user?: CurrentUserData
) => {
  validateTattooWorkData(data, true);

  if (
    user &&
    (data.hasOwnProperty("tattooistId") || data.hasOwnProperty("tattooist"))
  )
    throw { code: 400, message: "You can't change your work creator" };

  let tattooWork = await TattooWork.findOneBy({
    id,
    ...(user && { tattooistId: user.userId }),
  });

  if (!tattooWork) throw { code: 404, message: "Tattoo work not found" };
  Object.assign(tattooWork, data);
  return { data: formatTattooWork(tattooWork) };
};

export const deleteTattooWork = async (id: number, user?: CurrentUserData) => {
  const tattooWorkDeleted = await TattooWork.delete({
    id,
    ...(user && { tattooistId: user.userId }),
  });
  if (!tattooWorkDeleted.affected)
    throw { code: 404, message: "Tattoo work not found" };
  return tattooWorkDeleted;
};
