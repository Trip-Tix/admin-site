//ADMIN -- Has all the access
//BUS_ADMIN -- Has only the access of bus related services, can view, modify
//TRAIN_ADMIN -- Has only the access of train related services, can view, modify
//BUS_MANAGER -- Has only the access of bus related services, can view
//TRAIN_MANAGER -- Has only the access of train related services, can view 

export enum Roles {
    ADMIN = 'ADMIN',
    BUS_ADMIN = 'BUS_ADMIN',
    TRAIN_ADMIN = 'TRAIN_ADMIN',
    BUS_MANAGER = 'BUS_MANAGER',
    TRAIN_MANAGER = 'TRAIN_MANAGER'
}