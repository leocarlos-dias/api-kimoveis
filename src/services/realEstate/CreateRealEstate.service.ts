import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { Address } from "../../entities/Address.entity";
import { Category } from "../../entities/Category.entity";
import { RealEstate } from "../../entities/RealEstate.entity";
import { CustomError } from "../../errors/CustomError";
import { IAddress } from "../../interfaces/address.interfaces";
import { ICategory } from "../../interfaces/category.interfaces";
import { ICreateRealEstate, IRealEstate } from "../../interfaces/realEstate.interfaces";

export class CreateRealEstateService {
    async execute(realEstate: ICreateRealEstate): Promise<IRealEstate> {

        const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
        const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
        const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

        const addressFound: IAddress | null = await addressRepository.findOne({
            where: {
                street: realEstate.address.street,
                zipCode: realEstate.address.zipCode,
                number: realEstate.address.number!,
                city: realEstate.address.city,
                state: realEstate.address.state,
            },
        });
        if (addressFound) throw new CustomError(409, "Address already exists");

        const createdAddress: IAddress = await addressRepository.save(addressRepository.create(realEstate.address));

        const categoryFound: ICategory | null = await categoryRepository.findOneBy({ id: realEstate.categoryId });
        if (!categoryFound) throw new CustomError(404, "Category not found");

        const createdRealEstate: IRealEstate = await realEstateRepository.save(realEstateRepository.create({ ...realEstate, address: createdAddress, category: categoryFound }));

        return createdRealEstate
    }
}