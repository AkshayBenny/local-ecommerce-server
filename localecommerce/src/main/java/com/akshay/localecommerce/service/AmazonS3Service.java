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

/**
 * Service class for communicating with Amazon S3
 */
@Service
public class AmazonS3Service {

    @Autowired
    private AmazonS3 s3Client;

    @Value("${aws.bucketName}")
    private String bucketName;

    /**
     * Uploads file to S3
     * @param multipartFile The uploaded image file
     * @param fileName The name of the file stored in s3 bucket
     * @return The name of the uploaded file
     * @throws IOException
     */
    public String uploadFile(MultipartFile multipartFile, String fileName) throws IOException {
        File file = convertMultipartFileToFile(multipartFile);
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, file));
        file.delete();
        return fileName;
    }

    /**
     * Converts into a multipart file
     * 
     * @param multipartFile The multipart file to convert
     * @return Converted file
     * @throws IOException
     */
    private File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
        }
        return file;
    }

    /**
     * Gets the name of the file uploaded to s3 bucket
     * @param fileName Name of the file
     * @return The url of the file uploaded to s3 bucket
     */
    public String getFileUrl(String fileName) {
        try {
            return s3Client.getUrl(bucketName, fileName).toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "no image url";
        }
    }

    /**
     * Deletes file by filename from s3 bucket
     * @param fileName
     */
    public void deleteFileById(String fileName) {
        s3Client.deleteObject(new DeleteObjectRequest(bucketName, fileName));
    }

}
