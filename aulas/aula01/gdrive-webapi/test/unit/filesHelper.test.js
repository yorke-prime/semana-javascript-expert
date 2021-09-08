import {
    describe,
    test,
    expect,
    jest
} from "@jest/globals";
import fs from "fs";
import Routes from "../../src/routes.js";
import FileHelper from "../../src/fileHelper.js";

describe("#fileHelper suite test", () => {
    describe("#getFileStatus", () => {
        test("it should return file statues in current format", async () => {
            const statMock = {
                dev: 2226570275,
                mode: 33206,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: 0,
                blksize: 4096,
                ino: 9570149209537904,
                size: 1778068,
                blocks: 3480,
                atimeMs: 1631044591678.3594,
                mtimeMs: 1631044591302.9998,
                ctimeMs: 1631044591303.3623,
                birthtimeMs: 1631044582784.6978,
                atime: "2021-09-07T19:56:31.678Z",
                mtime: "2021-09-07T19:56:31.303Z",
                ctime: "2021-09-07T19:56:31.303Z",
                birthtime: "2021-09-07T19:56:22.785Z"
            }

            const mockUser = "yorke";
            process.env.USER = mockUser;
            const filename = "file.png";
            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])

            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)

            const result = await FileHelper.getFilesStatus("/tmp");

            const expectedResult = [
                {
                    size: "1.78 MB",
                    lastModified: "2021-09-07T19:56:22.785Z",
                    owner: mockUser,
                    file: filename
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
            expect(result).toMatchObject(expectedResult);
        });
    })
})