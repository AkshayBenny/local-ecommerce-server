package com.akshay.localecommerce.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class AmazonS3Service {

    @Autowired
    private AmazonS3 s3Client;

    @Value("${aws.bucketName}")
    private String bucketName;

    public String uploadFile(MultipartFile multipartFile, String fileName) throws IOException {
        File file = convertMultipartFileToFile(multipartFile);
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, file));
        file.delete();
        return fileName;
    }

    private File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
        }
        return file;
    }

    public String getFileUrl(String fileName) {
        try {
            return s3Client.getUrl(bucketName, fileName).toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "no image url";
        }
    }

    public void deleteFileById(String fileName) {
        s3Client.deleteObject(new DeleteObjectRequest(bucketName, fileName));
    }

}
