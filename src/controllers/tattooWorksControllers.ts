import { Handler } from "express";
import { TattooWork } from "../models/TattooWork";
import { formatPaginationResponse, formatTattooWork } from "../utils/format";
import { validateTattooWorkData } from "../utils/tattooWorkValidation";
import { AppDataSource } from "../db";

//Admin CRUD
export const getTattooWorkById: Handler = async (req, res) => {
  const tattooWork = await TattooWork.findOne({
    relations: ["tattooist"],
    where: { id: parseInt(req.params.id) },
  });
  if (!tattooWork) throw { code: 404, message: "Tatto work not found" };
  res.status(200).json({ data: formatTattooWork(tattooWork, req) });
};

export const getTattooWorks: Handler = async (req, res) => {
  let { pageSize = 10, page = 1 } = req.query;
  pageSize = parseInt(pageSize as string);
  page = parseInt(page as string);

  const [tattooWorks, totalItems] = await TattooWork.findAndCount({
    relations: ["tattooist"],
    where: req.body,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  res.status(200).json(
    formatPaginationResponse({
      req,
      page,
      pageSize,
      totalItems,
      items: tattooWorks.map((tattooWork) => formatTattooWork(tattooWork, req)),
    })
  );
};

export const createTattooWork: Handler = async (req, res) => {
  validateTattooWorkData(req.body);
  const createdTattooWork = await TattooWork.create(req.body).save();
  res.status(201).json({ data: formatTattooWork(createdTattooWork, req) });
};

export const updateTattooWork: Handler = async (req, res) => {
  validateTattooWorkData(req.body, true);
  const tattooWorkRepository = AppDataSource.getRepository(TattooWork);
  let tattooWork = await tattooWorkRepository.findOneBy({
    id: parseInt(req.params.id),
  });
  if (!tattooWork) throw { code: 404, message: "Tattoo work not found" };
  tattooWork = { ...tattooWork, ...req.body };
  res
    .status(200)
    .json({ data: formatTattooWork(tattooWork as TattooWork, req) });
};

export const deleteTattooWork: Handler = async (req, res) => {
  const tattooWorkDeleted = await TattooWork.delete({
    id: parseInt(req.params.id),
  });
  if (!tattooWorkDeleted.affected)
    throw { code: 404, message: "Tattoo work not found" };
  res.status(204).json(tattooWorkDeleted);
};

//User endpoints

export const getMyTattooWorkById: Handler = async (req, res) => {
  const tattooWork = await TattooWork.findOne({
    relations: ["tattooist"],
    where: { id: parseInt(req.params.id) },
  });
  if (!tattooWork) throw { code: 404, message: "Tatto work not found" };
  res.status(200).json({ data: formatTattooWork(tattooWork, req) });
};

export const getMyTattooWorks: Handler = async (req, res) => {
  let { pageSize = 10, page = 1 } = req.query;
  pageSize = parseInt(pageSize as string);
  page = parseInt(page as string);

  const [tattooWorks, totalItems] = await TattooWork.findAndCount({
    relations: ["tattooist"],
    where: req.body,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  res.status(200).json(
    formatPaginationResponse({
      req,
      page,
      pageSize,
      totalItems,
      items: tattooWorks.map((tattooWork) => formatTattooWork(tattooWork, req)),
    })
  );
};

export const createMyTattooWork: Handler = async (req, res) => {
  validateTattooWorkData(req.body);
  const createdTattooWork = await TattooWork.create(req.body).save();
  res.status(201).json({ data: formatTattooWork(createdTattooWork, req) });
};

export const updateMyTattooWork: Handler = async (req, res) => {
  validateTattooWorkData(req.body, true);
  const tattooWorkRepository = AppDataSource.getRepository(TattooWork);
  let tattooWork = await tattooWorkRepository.findOneBy({
    id: parseInt(req.params.id),
  });
  if (!tattooWork) throw { code: 404, message: "Tattoo work not found" };
  tattooWork = { ...tattooWork, ...req.body };
  res
    .status(200)
    .json({ data: formatTattooWork(tattooWork as TattooWork, req) });
};

export const deleteMyTattooWork: Handler = async (req, res) => {
  const tattooWorkDeleted = await TattooWork.delete({
    id: parseInt(req.params.id),
  });
  if (!tattooWorkDeleted.affected)
    throw { code: 404, message: "Tattoo work not found" };
  res.status(204).json(tattooWorkDeleted);
};
