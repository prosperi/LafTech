class ApiController < ApplicationController

  def list_counties
    @counties = School.select('county').group('county').all().pluck('county')
    json_response(@counties)
  end

  def list_schools
    @schools = School.joins(:Fact)
    .where(school: {county: params[:county_id]})
    .select('data_school_facts.school_add_city,
             data_school_facts.school_enrollment,
             data_school_facts.grades_offered,
             data_school_facts.dropout_rate,
             data_school_facts.sat_math,
             data_school_facts.sat_reading,
             data_school_facts.sat_writing,
             data_school_facts.website,
             data_school_facts.school_add_city,
             school.school_name,
             school.latitude,
             school.longitude,
             school.state_lea_id
            ')
            .uniq
    # .distinct()
    json_response(@schools)
  end

  def search_schools
    @schools = School.where('school_name LIKE UPPER(?) AND county IS NOT NULL', "%#{params[:query]}%").uniq
    json_response(@schools)
  end

  def school_details
    @schools = School.joins(:Fact)
    .where('school.state_lea_id = ?', params[:school_id])
    .select('data_school_facts.school_add_city,
             data_school_facts.school_enrollment,
             data_school_facts.grades_offered,
             data_school_facts.male,
             data_school_facts.female,
             data_school_facts.dropout_rate,
             data_school_facts.website,
             data_school_facts.school_add_city,
             data_school_facts.telephone_no,
             data_school_facts.act_english,
             data_school_facts.act_math,
             data_school_facts.act_reading,
             data_school_facts.act_science,
             data_school_facts.sat_math,
             data_school_facts.sat_reading,
             data_school_facts.sat_writing,
             data_school_facts.americanindian_alaskan,
             data_school_facts.asian,
             data_school_facts.black,
             data_school_facts.hawaiian_pacific_islander,
             data_school_facts.hispanic,
             data_school_facts.multiracial,
             data_school_facts.white,
             school.school_name,
             school.county,
             school.latitude,
             school.longitude,
             school.state_lea_id,
             school.lea_type
            ')
    .first
    json_response(@schools)
  end

  def visualization_1
    @pssa_information = School.joins(:Fiscal, :Performance_Measure)
            .select('
              pupil_expenditure_total,
              school.state_lea_id,
              school_name,
              math_algebra_percent_proficient,
              reading_lit_percent_proficient_pssa,
              scibio_percent_proficient_pssa
            ')
            .where.not(data_school_fiscal: { pupil_expenditure_total: nil})
            .where.not(data_school_performance_measure: { math_algebra_percent_proficient: nil })
            .where.not(data_school_performance_measure: { reading_lit_percent_proficient_pssa: nil })
            .where.not(data_school_performance_measure: { scibio_percent_proficient_pssa: nil })
            .order('pupil_expenditure_total ASC')
            .all()
  json_response(@pssa_information)
  end
  
  def visualization_2
    @pssa_performance_information = Exam.joins(:School)
              .select('
                subject,
                lea_type,
                AVG(pctadvanced) AS avgpctadvanced,
                AVG(pctproficient) AS avgpctproficient,
                AVG(pctbasic) AS avgpctbasic,
                AVG(pctbelowbasic) AS avgpctbelowbasic
              ')
              .where.not(data_exam: { pctadvanced: nil })
              .where.not(data_exam: { pctproficient: nil })
              .where.not(data_exam: { pctbasic: nil })
              .where.not(data_exam: { pctbelowbasic: nil })
              .where(data_exam: { student_group: "All Students" })
              .where(data_exam: { source: ["pssa"] })
              .where(data_exam: { grade: params[:grade] })
              .where(data_exam: { academic_year_start: params[:academic_year_start] })
              .group("lea_type")
              .group("subject")

    json_response(@pssa_performance_information)

  end

  def visualization_3
    @fiscal_information = School.joins(:Fiscal, :Fact)
              .select('
                school_name,
                (sat_math + sat_reading + sat_writing) AS sat_total,
                (local_revenue + state_revenue + other_revenue + fed_revenue) AS totalRevenue
              ')
              .where.not(data_school_facts: { sat_math: nil })
              .where.not(data_school_facts: { sat_reading: nil })
              .where.not(data_school_facts: { sat_writing: nil })
              .order('totalRevenue ASC')
              .all()
    json_response(visualization_3_custom_json(@fiscal_information))
  end

  def visualization_3_custom_json(data)
    @dataResult = data.map do |tuple|
      {
        :schoolName => tuple.school_name, :totalRevenue => tuple.totalrevenue,
        :sat_math => tuple.sat_math, :sat_reading => tuple.sat_reading,
        :sat_writing => tuple.sat_writing
      }
    end

    @dataResult.as_json
  end
end
